import { useEffect, useState } from "react";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    fetch("http://127.0.0.1:5000/api/enrollments/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // 👈 DEBUG
        setCourses(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Learning 📚
      </h1>

      {courses.length === 0 ? (
        <p>No enrolled courses yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {courses.map(item => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="font-semibold text-lg">
                {item.course?.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.course?.description}
              </p>

              {/* Progress */}
              <div className="w-full bg-gray-200 h-2 rounded mt-3">
                <div className="bg-blue-600 h-2 rounded w-1/2"></div>
              </div>

              <p className="text-sm mt-2">Progress: 50%</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;