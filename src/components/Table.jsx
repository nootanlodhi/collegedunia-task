import { useState, useEffect } from "react";
// import "./styles.css";

const dummyColleges = [
  {
    cdRank:1,
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    courses: ["B.Tech Computer Science Engineering"],
    fees: 209500,
    placement: 1980000,
    userReviews: 8.7,
    ranking: 131,
    featured: true,
  },
  {
    cdRank:2,
    name: "IIT Delhi",
    location: "New Delhi, Delhi NCR",
    courses: ["B.Tech", "M.Tech Mathematics and Computing"],
    fees: 254650,
    placement: 2000000,
    userReviews: 8.8,
    ranking: 35,
    featured: true,
  },
  {
    cdRank:3,
    name: "Parul University, Vadodara",
    location: "Vadodara, Gujarat",
    courses: ["B.Tech"],
    fees: 140000,
    placement: 300000,
    userReviews: 7.6,
    ranking: 147,
    featured: false,
  },
  {
    cdRank:4,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    courses: ["B.Tech Computer Science Engineering"],
    fees: 229300,
    placement: 3670000,
    userReviews: 9.2,
    ranking: 35,
    featured: true,
  },
  // Add more colleges as needed
];

const Table = () => {
  const [colleges, setColleges] = useState(dummyColleges.slice(0, 10));
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchMoreData = () => {
      setTimeout(() => {
        const additionalColleges = dummyColleges.slice(
          colleges.length,
          colleges.length + 10
        );
        setColleges((prevColleges) => [...prevColleges, ...additionalColleges]);
      }, 1000);
    };

    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        fetchMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [colleges]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortColleges = (key) => {
    const sortedColleges = [...colleges].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] - b[key];
      } else {
        return b[key] - a[key];
      }
    });
    setColleges(sortedColleges);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by college name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="btn-container">
        <button
          onClick={() => {
            sortColleges("ranking");
            toggleSortOrder();
          }}
        >
          Sort by Ranking
        </button>
        <button
          onClick={() => {
            sortColleges("fees");
            toggleSortOrder();
          }}
        >
          Sort by Fees
        </button>
        <button
          onClick={() => {
            sortColleges("userReviews");
            toggleSortOrder();
          }}
        >
          Sort by User Reviews
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>Colleges</th>
            <th>Location</th>
            <th>Courses</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {filteredColleges.map((college) => (
            <tr key={college.cdRank}>
              <td>#{college.cdRank}</td>
              <td>{college.name}</td>
              <td>{college.location}</td>
              <td>{college.courses.join(", ")}</td>
              <td>₹{college.fees}</td>
              <td>₹{college.placement}</td>
              <td>{college.userReviews}</td>
              <td>{college.ranking}</td>
              <td>{college.featured ? "Featured" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
