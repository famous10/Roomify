import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "~/components/Button";
import Upload from "~/components/Upload";
import { Layers } from "lucide-react";
import { saveFloorPlan } from "~/libs/puter.action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomify - Build beautiful spaces" },
    { name: "description", content: "Roomify is an AI-first design environment" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = async (base64: string) => {
    console.log("Upload complete, saving to Puter...");
    setSaving(true);
    setError(null);
    try {
      const id = Date.now().toString();
      await saveFloorPlan(base64, id);
      console.log("Redirecting to visualizer:", id);
      navigate(`/visualizer/${id}`);
    } catch (err) {
      console.error("Failed to save to Puter:", err);
      setError("Failed to save your file. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>

        <h1>Build beautiful spaces at the speed of thought with Roomify</h1>

        <p className="subtitle">
          Roomify is an AI-first design environment that helps you visualize,
          render, and ship architectural projects faster than ever.
        </p>

        <div className="actions">
          <a href="#upload" className="cta">Start Building</a>

          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>

        <div id="upload" className="upload-shell">
          <div className="grid-overlay"></div>
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG formats up to 10MB</p>
              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
              )}
              {saving ? (
                <div className="text-sm text-zinc-500 mt-4">Saving to Puter...</div>
              ) : (
                <Upload onComplete={handleUploadComplete} />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>Your latest work and shared community projects, all in one place.</p>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img
                  src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                  alt="Floor plan project"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}