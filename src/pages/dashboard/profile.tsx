import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);

 useEffect(()=> {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if(!token) return navigate('/login');

            await fetch('http://localhost:5000/api/user/profile', {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res)=>res.json())
            .then((data)=>{
              setUser(data);
                setEditData({
                    name: data.name,
                    email: data.email
                });
            })
        } catch (error) {
            return console.log('Error', error);
        }
    };

    fetchProfile();
 }, []);

  // Input handler
  const handleChange = (e : any) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

//   // Save profile
  const handleSave = async () => {
    setIsSaving(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    });

    const data = await res.json();
    setIsSaving(false);

    if (data.success) {
      setUser(data.user);
      alert("Profile Updated!");
    } else {
      alert("Update Failed");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-2xl p-10 mt-10 rounded-3xl shadow-lg">

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-semibold">
            {editData.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
            <p className="text-gray-500">Manage your account details</p>
          </div>
        </div>

        {/* INPUT GROUP */}
        <div className="space-y-6">

          {/* NAME INPUT */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="peer w-full px-4 pt-8 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              placeholder=" "
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Full Name
            </label>
          </div>

          {/* EMAIL INPUT */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={editData.email}
              // onChange={handleChange}
              className="peer w-full px-4 pt-8 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              placeholder=" "
              disabled
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Email (Not Editable)
            </label>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex gap-4">

          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl text-lg font-medium hover:bg-gray-300 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;
