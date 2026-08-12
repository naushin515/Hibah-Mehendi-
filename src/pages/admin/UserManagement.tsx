import { adminUsers } from '../../data/adminUsers'
import Badge from '../../components/ui/Badge'

export default function UserManagement() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">User Management</h1>
      <p className="text-sm text-stone-500">{adminUsers.length} registered users</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left dark:border-stone-800">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Mobile</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id} className="border-b border-stone-100 dark:border-stone-800">
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-stone-500">{user.email}</td>
                <td className="p-4">{user.mobile}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4 text-stone-500">{new Date(user.joinedAt).toLocaleDateString('en-IN')}</td>
                <td className="p-4">
                  <Badge variant={user.status === 'active' ? 'new' : 'default'}>{user.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
