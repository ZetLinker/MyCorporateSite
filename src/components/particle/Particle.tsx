import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import template from "../../assets/particlesjs-config.json";
import "./Particle.css"; // CSSファイルをインポート

const Particle = () => {
  const params = {
    ...template,
    fullScreen: {
      enable: false, // フルスクリーンをOFFにする
    },
  } as typeof template;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={params as any}
      className="particle-container"
    />
  );
};

export default Particle;
