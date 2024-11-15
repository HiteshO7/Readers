"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header/Header";
import "./page.scss"; // Import SCSS file for styling

export default function Page() {
  const [yamlData, setYamlData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMaturity, setSelectedMaturity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/yamlData");
        if (!response.ok) {
          console.error("Error fetching data:", response.statusText);
          return;
        }
        const data = await response.json();
        setYamlData(data);
        setFilteredData(data); // Initialize filtered data with all items
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    let filtered = yamlData;
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.content.authors.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMaturity) {
      filtered = filtered.filter(
        (item) =>
          item.content.maturity &&
          item.content.maturity.toLowerCase() === selectedMaturity.toLowerCase()
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) =>
          item.content.categories &&
          item.content.categories.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    if (selectedFunction) {
      filtered = filtered.filter(
        (item) =>
          item.content.functions &&
          item.content.functions.toLowerCase().includes(selectedFunction.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedMaturity, selectedCategory, selectedFunction]);

  const toggleCard = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state
    visible: { opacity: 1, y: 0 }, // Final state
  };

  useEffect(() => {
    const updateLineHeight = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const lines = document.querySelectorAll(".line1, .line2");
      lines.forEach(line => {
        line.style.height = `${pageHeight}px`;
      });
    };

    // Initial height update and event listener for resizing
    updateLineHeight();
    window.addEventListener("resize", updateLineHeight);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateLineHeight);
  }, []);

  return (
    <>
      <Header />
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="container">
        {/* Search Bar */}
        <div className="search-container">
          <div className="input-wrapper">
            <div className="image-div">
              <img
                src="/Search.png"
                alt="Search Icon"
                className="search-icon"
              />
            </div>
            <input
              type="text"
              placeholder="Search by author....."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter">
            <select
              value={selectedMaturity}
              onChange={(e) => setSelectedMaturity(e.target.value)}
            >
              <option value="">Maturity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Category</option>
              <option value="Change Management">Change Management</option>
              <option value="Architecture">Architecture</option>
              <option value="Configuration">Configuration</option>
              <option value="Process">Process</option>
            </select>
          </div>
          <div className="filter">
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
            >
              <option value="">Function</option>
              <option value="Security">Security</option>
              <option value="Reliability">Reliability</option>
              <option value="Standards">Standards</option>
            </select>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {/* Display filtered data */}
        {!loading && (
          <motion.div
            className="cards-container"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={index}
                className={`card ${selectedCard === index ? "expanded" : ""}`}
                onClick={() => toggleCard(index)}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glow-border"></div>
                {item.content.name && (
                  <p>
                    <strong>Name:</strong> {item.content.name}
                  </p>
                )}
                <p>
                  <strong>Authors:</strong> {item.content.authors || "N/A"}
                </p>
                {item.content.maturity && (
                  <p>
                    <strong>Maturity:</strong> {item.content.maturity}
                  </p>
                )}
                {item.content.functions && (
                  <p>
                    <strong>Functions:</strong> {item.content.functions}
                  </p>
                )}
                {item.content.categories && (
                  <p>
                    <strong>Categories:</strong> {item.content.categories}
                  </p>
                )}
                {item.content.resources && (
                  <p>
                    <strong>Resources:</strong> {item.content.resources}
                  </p>
                )}
                {selectedCard === index && (
                  <>
                    {item.content.categories && (
                      <p>
                        <strong>Categories:</strong>{" "}
                        {item.content.categories}
                      </p>
                    )}
                    {item.content.functions && (
                      <p>
                        <strong>Functions:</strong> {item.content.functions}
                      </p>
                    )}
                    {item.content.resources && (
                      <p>
                        <strong>Resources:</strong> {item.content.resources}
                      </p>
                    )}
                    {item.content.csps && (
                      <p>
                        <strong>Cloud Service Providers:</strong>{" "}
                        {item.content.csps}
                      </p>
                    )}
                    <p>
                      <strong>Summary:</strong> {item.content.summary || "N/A"}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {item.content.description || "N/A"}
                    </p>
                    {item.content.links &&
                      item.content.links.length > 0 && (
                        <div className="links">
                          <strong>Useful Links:</strong>
                          <ul>
                            {item.content.links.map((link, idx) => (
                              <li key={idx}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}
