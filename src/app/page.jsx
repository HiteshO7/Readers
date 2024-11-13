"use client";

import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import './page.scss'; // Import SCSS file for styling

export default function Page() {
  const [yamlData, setYamlData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaturity, setSelectedMaturity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/yamlData');
        if (!response.ok) {
          console.error('Error fetching data:', response.statusText);
          return;
        }
        const data = await response.json();
        setYamlData(data);
        setFilteredData(data); // Initialize filtered data with all items
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterData = () => {
    let filtered = yamlData;
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.content.authors.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMaturity) {
      filtered = filtered.filter(item =>
        item.content.maturity && item.content.maturity.toLowerCase() === selectedMaturity.toLowerCase()
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(item =>
        item.content.categories && item.content.categories.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    if (selectedFunction) {
      filtered = filtered.filter(item =>
        item.content.functions && item.content.functions.toLowerCase().includes(selectedFunction.toLowerCase())
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

  return (
    <>
      <Header />
      <div className="container">
        {/* Search Bar */}
        <div className="search-container">
          <div className="input-wrapper">
            <div className='image-div'>
              <img src="/Search.png" alt="Search Icon" className="search-icon" />
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
            <label>Maturity</label>
            <select
              value={selectedMaturity}
              onChange={(e) => setSelectedMaturity(e.target.value)}
            >
              <option value="">Select Maturity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="filter">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Change Management">Change Management</option>
              <option value="Architecture">Architecture</option>
              <option value="Configuration">Configuration</option>
              <option value="Process">Process</option>
            </select>
          </div>
          <div className="filter">
            <label>Function</label>
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
            >
              <option value="">Select Function</option>
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
          <div className="cards-container">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className={`card ${selectedCard === index ? 'expanded' : ''}`}
                onClick={() => toggleCard(index)}
              >
                <div className="glow-border"></div> {/* Glow effect element */}
                {item.content.name && <p><strong>Name:</strong> {item.content.name}</p>}
                <p><strong>Authors:</strong> {item.content.authors || 'N/A'}</p>
                {item.content.maturity && <p><strong>Maturity:</strong> {item.content.maturity}</p>}

                {item.content.functions && <p><strong>Functions:</strong> {item.content.functions}</p>}
                {item.content.categories && <p><strong>Categories:</strong> {item.content.categories}</p>}
                {item.content.functions && <p><strong>Functions:</strong> {item.content.functions}</p>}
                    {item.content.resources && <p><strong>Resources:</strong> {item.content.resources}</p>}
                {/* Additional content only shown if card is expanded */}
                {selectedCard === index && (
                  <>
                    {item.content.categories && <p><strong>Categories:</strong> {item.content.categories}</p>}
                    {item.content.functions && <p><strong>Functions:</strong> {item.content.functions}</p>}
                    {item.content.resources && <p><strong>Resources:</strong> {item.content.resources}</p>}
                    {item.content.csps && <p><strong>Cloud Service Providers:</strong> {item.content.csps}</p>}
                    <p><strong>Summary:</strong> {item.content.summary || 'N/A'}</p>
                    <p><strong>Description:</strong> {item.content.description || 'N/A'}</p>
                    {item.content.links && item.content.links.length > 0 && (
                      <div className="links">
                        <strong>Useful Links:</strong>
                        <ul>
                          {item.content.links.map((link, idx) => (
                            <li key={idx}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
