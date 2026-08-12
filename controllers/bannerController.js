import Banner from '../models/Banner.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Get banner settings (public — no auth required)
export const getBanner = async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({
        textBanner: { enabled: false, message: '', color: 'green', startDate: null, endDate: null },
        posterBanner: { enabled: false, imageUrl: '', publicId: '', linkTo: '/shop' },
      });
    }
    res.json(banner);
  } catch (error) {
    console.error('getBanner error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update text banner (admin only)
export const updateTextBanner = async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) banner = await Banner.create({});

    const { enabled, message, color, startDate, endDate } = req.body;

    // ✅ Set each field individually so Mongoose detects the change
    banner.textBanner.enabled = enabled === true || enabled === 'true';
    banner.textBanner.message = message || '';
    banner.textBanner.color = color || 'green';
    banner.textBanner.startDate = startDate || null;
    banner.textBanner.endDate = endDate || null;

    // ✅ Tell Mongoose this nested object was modified
    banner.markModified('textBanner');
    await banner.save();

    console.log('Text banner updated:', banner.textBanner);
    res.json(banner);
  } catch (error) {
    console.error('updateTextBanner error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update poster banner (admin only)
export const updatePosterBanner = async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) banner = await Banner.create({});

    const { enabled, linkTo } = req.body;

    if (req.file) {
      // Delete old Cloudinary image if exists
      if (banner.posterBanner.publicId) {
        await deleteFromCloudinary(banner.posterBanner.publicId).catch(() => {});
      }
      const result = await uploadToCloudinary(req.file.buffer, 'hibah_banners');
      banner.posterBanner.imageUrl = result.secure_url;
      banner.posterBanner.publicId = result.public_id;
    }

    banner.posterBanner.enabled = enabled === true || enabled === 'true';
    banner.posterBanner.linkTo = linkTo || '/shop';

    // ✅ Tell Mongoose this nested object was modified
    banner.markModified('posterBanner');
    await banner.save();

    console.log('Poster banner updated:', banner.posterBanner);
    res.json(banner);
  } catch (error) {
    console.error('updatePosterBanner error:', error.message);
    res.status(500).json({ message: error.message });
  }
};
