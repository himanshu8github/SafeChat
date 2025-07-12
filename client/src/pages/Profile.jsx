export default function Profile() {
  const user = {
    name: "Himanshu",
    username: "him8dev",
    email: "him@abc.com",
    contact: "+91-9876543210",
    country: "India",
    state: "Uttar Pradesh"
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 User Profile</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p><strong>State:</strong> {user.state}</p>
      </div>
    </div>
  );
}
