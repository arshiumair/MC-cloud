import React, { useState, useEffect } from "react";
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
const Estimate = () => {
  const [csp, setCsp] = useState("");
  const [region, setRegion] = useState("");
  const [cspAuto, setCspAuto] = useState(false);
  const [regionAuto, setRegionAuto] = useState(false);
  // Toggle assistant mode for each field
  const getAssistantSuggestion = (fieldName) => {
    if (fieldName === "csp") setCspAuto((prev) => !prev);
    if (fieldName === "region") setRegionAuto((prev) => !prev);
  };
  const [budget, setBudget] = useState("");
  const [projectType, setProjectType] = useState("");
  const [otherProjectType, setOtherProjectType] = useState("");
  const [users, setUsers] = useState("");
  const [description, setDescription] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userRegionOptions, setUserRegionOptions] = useState([]);
  const [projectTypeOptions, setProjectTypeOptions] = useState([]);
  const [workloadType, setWorkloadType] = useState("");
  const [otherWorkloadType, setOtherWorkloadType] = useState("");
  const [workloadTypeOptions, setWorkloadTypeOptions] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [regionOptions, setRegionOptions] = useState({});
  const cspOptions = ["AWS", "Azure", "GCP"];

  useEffect(() => {
    fetch("http://13.232.83.252:8000/api/regions")
      .then((res) => res.json())
      .then((data) => setRegionOptions(data))
      .catch((err) => console.error("Failed to load regions", err));
  }, []);

  useEffect(() => {
    fetch("http://13.232.83.252:8000/api/user-regions")
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is always an array
        if (Array.isArray(data)) {
          setUserRegionOptions(data);
        } else if (typeof data === "object" && data !== null) {
          setUserRegionOptions(Object.values(data));
        } else {
          setUserRegionOptions([]);
        }
      })
      .catch((err) => {
        setUserRegionOptions([]);
        console.error("Failed to load user regions", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://13.232.83.252:8000/api/project-types")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjectTypeOptions(data);
        } else if (typeof data === "object" && data !== null) {
          setProjectTypeOptions(Object.values(data));
        } else {
          setProjectTypeOptions([]);
        }
      })
      .catch((err) => {
        setProjectTypeOptions([]);
        console.error("Failed to load project types", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://13.232.83.252:8000/api/workload-types")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkloadTypeOptions(data);
        } else if (typeof data === "object" && data !== null) {
          setWorkloadTypeOptions(Object.values(data));
        } else {
          setWorkloadTypeOptions([]);
        }
      })
      .catch((err) => {
        setWorkloadTypeOptions([]);
        console.error("Failed to load workload types", err);
      });
  }, []);

  const handleEstimate = async () => {
    setLoading(true);
    // Show engaging loading message immediately
    navigate("/recommendation", {
      state: {
        result: "**Thanks for your information!**\n\nWe are making the best strategy based on your requirements. Please wait while we prepare your personalized cloud deployment recommendation..."
      }
    });
    try {
      const response = await fetch("http://13.232.83.252:8000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csp: cspAuto ? "choose best suitable" : csp,
          region: regionAuto ? "choose best suitable" : region,
          userBaseRegion: userRegion,
          budget,
          projectType: projectType === "Other" ? otherProjectType : projectType,
          workloadType: workloadType === "Other" ? otherWorkloadType : workloadType,
          users,
          description,
        }),
      });
      const data = await response.json();
      // Replace Gemini's default opening sentence with a more engaging one
      let recommendation = data.response || "No response received.";
      const defaultOpening = "Of course. As an expert cloud architect, here is a straightforward cloud deployment recommendation based on your requirements.";
      const engagingOpening = "Your personalized cloud strategy is ready! Here’s a tailored deployment plan crafted just for your needs:";
      if (recommendation.startsWith(defaultOpening)) {
        recommendation = engagingOpening + recommendation.slice(defaultOpening.length);
      }
      navigate("/recommendation", { state: { result: recommendation } });
    } catch (err) {
      // Optionally handle error UI here
      navigate("/recommendation", { state: { result: "Error: Could not get recommendation." } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex justify-center items-center">
      <div className="w-full max-w-3xl p-8 bg-indigo-950 rounded-lg shadow-lg text-white">
        <div className="max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-lg mt-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-indigo-400">
            Estimate Deployment Cost
          </h2>

          {/* CSP Selection */}
          <div className="flex items-center mb-4 gap-2">
            <div className="flex-1">
              <label className="block mb-2">Select Cloud Provider</label>
              <select
                value={csp}
                onChange={(e) => {
                  setCsp(e.target.value);
                  setRegion(""); // Reset region when CSP changes
                }}
                className={`w-full p-2 rounded border border-gray-600 ${cspAuto ? 'bg-indigo-900 text-indigo-300 cursor-not-allowed' : 'bg-gray-800'}`}
                disabled={cspAuto}
              >
                <option value="">-- Select --</option>
                {cspOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={`p-1 rounded hover:bg-indigo-900 mt-6 ${cspAuto ? 'bg-indigo-900 opacity-80' : ''}`}
              title={cspAuto ? "Disable Assistant" : "Let Assistant Choose"}
              onClick={() => getAssistantSuggestion("csp")}
            >
              <SparklesIcon className={`h-5 w-5 ${cspAuto ? 'text-yellow-400' : 'text-indigo-400'}`} />
            </button>
          </div>

          {/* Region selection */}
          <div className="mb-5 flex items-center gap-2">
            <div className="flex-1">
              <label className="block mb-2">Select Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`w-full p-2 rounded border border-gray-600 mb-4 ${regionAuto ? 'bg-indigo-900 text-indigo-300 cursor-not-allowed' : 'bg-gray-800'}`}
                disabled={!csp || regionAuto}
              >
                <option value="">-- Select Region --</option>
                {(regionOptions[csp] || []).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={`p-1 rounded hover:bg-indigo-900 mt-6 ${regionAuto ? 'bg-indigo-900 opacity-80' : ''}`}
              title={regionAuto ? "Disable Assistant" : "Let Assistant Choose"}
              onClick={() => getAssistantSuggestion("region")}
            >
              <SparklesIcon className={`h-5 w-5 ${regionAuto ? 'text-yellow-400' : 'text-indigo-400'}`} />
            </button>
          </div>

          {/* User Region */}
          <label className="block mb-2">User Region</label>
          <select
            value={userRegion}
            onChange={(e) => setUserRegion(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">-- Select User Region --</option>
            {userRegionOptions.length === 0 ? (
              <option disabled>Region not found</option>
            ) : userRegionOptions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          {/* Budget */}
          <label className="block mb-2">Monthly Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          />

          {/* Project Type */}
          <label className="block mb-2">Project Type</label>
          <select
            value={projectType}
            onChange={(e) => {
              setProjectType(e.target.value);
              if (e.target.value !== "Other") setOtherProjectType("");
            }}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">-- Select Type --</option>
            {projectTypeOptions.length === 0 ? (
              <option disabled>Type not found</option>
            ) : projectTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {projectType === "Other" && (
            <div className="mb-4">
              <label className="block mb-2">Please specify your project type</label>
              <input
                type="text"
                value={otherProjectType}
                onChange={(e) => setOtherProjectType(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                placeholder="Describe your project type"
              />
            </div>
          )}

          {/* Workload Type */}
          <label className="block mb-2">Workload Type</label>
          <select
            value={workloadType}
            onChange={(e) => setWorkloadType(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          >
            <option value="">-- Select Workload Type --</option>
            {workloadTypeOptions.length === 0 ? (
              <option disabled>Type not found</option>
            ) : workloadTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {workloadType === "Other" && (
            <div className="mb-4">
              <label className="block mb-2">Please specify your workload type</label>
              <input
                type="text"
                value={otherWorkloadType}
                onChange={(e) => setOtherWorkloadType(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                placeholder="Describe your workload type"
              />
            </div>
          )}

          {/* Users */}
          <label className="block mb-2">Approximate Number of Users</label>
          <input
            type="number"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
          />

          {/* Description */}
          <label className="block mb-2">Optional Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600"
            placeholder="Tell us more about your project..."
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleEstimate}
              className="bg-gray-600 hover:bg-indigo-800 px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Estimate"}
            </button>
          </div>
          {/* Recommendation will be shown on a separate page */}
        </div>
      </div>
    </div>
  );
};

export default Estimate;
