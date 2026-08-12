import api from './api';

export async function shareProduct(title: string, url: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text: `Check out ${title} at Hibah Mehendi Store`, url })
      return true
    } catch {
      return false
    }
  }
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
}

export async function uploadProductImage(file: File): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/products/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data; // should return { secure_url, public_id }
}

export async function deleteProductImage(publicId: string): Promise<void> {
  // For now, if we delete an image, we can just log or implement a delete route.
  console.log('Delete image requested for:', publicId);
}
