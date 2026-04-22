import { useEffect, useState } from "react";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const enroll = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch(`http://127.0.0.1:5000/api/enrollments/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
{/* Floating shapes */}
<div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full opacity-30 blur-2xl"></div>
<div className="absolute bottom-20 left-1/3 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
<div className="absolute top-1/3 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white flex flex-col justify-center px-16 relative z-10">

        <h1 className="text-5xl font-bold mb-6">
          Education is everything 🎓
        </h1>

        <p className="text-lg opacity-90 mb-6">
          Learn smarter, faster, and build real skills with EduLine.
        </p>

        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold w-fit">
          Explore Courses
              </button>
              
      </div>

      {/* DIAGONAL SHAPE */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <polygon
            fill="#1e3a8a"
            points="0,0 60,0 40,100 0,100"
          />
        </svg>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-gray-50 p-10 overflow-y-auto z-10">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Popular Courses
        </h2>

        <div className="space-y-6">

          {courses.map(course => (
            <div
              key={course._id}
              className="backdrop-blur-lg bg-white/70 p-4 rounded-xl shadow-md hover:shadow-xl transition flex gap-4"
            >
              {/* Image */}
              <img
                src={course.image}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex flex-col justify-between w-full">

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {course.instructor}
                  </p>

                  <p className="text-yellow-500 text-sm">
                    ⭐ {course.rating}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-blue-600 font-bold">
                    ₹{course.price}
                  </p>

                  <button
                    onClick={() => enroll(course._id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Enroll
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Home;