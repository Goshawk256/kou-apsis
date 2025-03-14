import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import All_Url from "../url";
import "./HomePage.css";
import SideBar from "../academic/components/sidebar/SideBar";
import Header from "../academic/components/header/Header";
import AnaSayfa from "../academic/components/pages/anasayfa/AnaSayfa";
import Dersler from "../academic/components/pages/dersler/Dersler";
import Oduller from "../academic/components/pages/oduller/Oduller";
import SanatsalFaaliyetler from "../academic/components/pages/sanat/SanatsalFaaliyetler";
import YonetilenTezler from "../academic/components/pages/tezler/YonetilenTezler";
import Yayinlar from "../academic/components/pages/yayinlar/Yayinlar";
import Projeler from "../academic/components/pages/projeler/Projeler";
import Basvurular from "../academic/components/pages/basvurular/Basvuru";
import Finish from "../academic/components/pages/finish/Finish";
import Help from "../academic/components/pages/help/Help";
import JuriHomepage from "../jury/components/JuriHomepage";
import RectorHomePage from "../rector/components/RectorHomePage";
import ExternalHome from "../externalacademic/components/ExternalHome";
import Citations from "../academic/components/pages/citations/Citations";
import Books from "../academic/components/pages/books/Books";
import Patents from "../academic/components/pages/patents/Patents";

function HomePage() {
  const [selectedPage, setSelectedPage] = useState("Ana Sayfa");
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    const navigateLogin = () => {
      navigate("/");
    };

    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp < Math.floor(Date.now() / 1000);
      } catch (error) {
        console.error("JWT çözümleme hatası:", error);
        return true;
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post(
          `${All_Url.api_base_url}/auth/refresh`,
          {
            refreshToken,
            username,
            role: storedRole,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setIsLoading(false); // Token yenilendiyse yüklenme bitti
        } else {
          navigateLogin();
        }
      } catch (error) {
        console.error("Token yenileme hatası:", error);
        navigateLogin();
      }
    };

    if (!accessToken) {
      navigateLogin();
    } else if (isTokenExpired(accessToken)) {
      if (refreshToken) {
        refreshAccessToken();
      } else {
        navigateLogin();
      }
    } else {
      setIsLoading(false); // Token zaten geçerliyse yüklenme bitti
    }
  }, [navigate]);

  const renderContent = () => {
    switch (selectedPage) {
      case "Ana Sayfa":
        return <AnaSayfa />;
      case "Yayınlarım(A-B)":
        return <Yayinlar />;
      case "Derslerim(E)":
        return <Dersler />;
      case "Yönetilen Tezler(F)":
        return <YonetilenTezler />;
      case "Patentlerim(G)":
        return <Patents />;
      case "Proje Görevlerim(H)":
        return <Projeler />;
      case "Ödüller(J)":
        return <Oduller />;
      case "Sanatsal Faaliyet(M)":
        return <SanatsalFaaliyetler />;
      case "Atıflarım(D)":
        return <Citations />;
      case "Kitaplarım(C)":
        return <Books />;
      case "Başvuru":
        return <Basvurular onSelect={setSelectedPage} />;
      case "Finish":
        return <Finish onSelect={setSelectedPage} />;
      case "Yardım":
        return <Help />;

      default:
        return <AnaSayfa />;
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      </div>
    ); // Token işlemi bitene kadar yükleniyor göstermek
  }
  return role === "Academic" ? (
    <div className="main-homepage">
      <Header />
      <SideBar onSelect={setSelectedPage} />
      <div className="flexible-component">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPage}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  ) : role === "Jury" ? (
    <JuriHomepage />
  ) : role === "Rector" ? (
    <RectorHomePage />
  ) : role === "ExternalAcademic" ? (
    <ExternalHome />
  ) : (
    <div>Yetkisiz erişim</div>
  );
}

export default HomePage;
