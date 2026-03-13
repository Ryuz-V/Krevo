async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
    cache: "no-store"
  });
  return res.json();
}

export default async function AdminUsers() {

  const users = await getUsers();

  return (
    <div>

      <h1>Users Management</h1>

      <table border={1} cellPadding={10} style={{marginTop:"20px"}}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user:any)=>(
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}