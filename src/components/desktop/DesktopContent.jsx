// src/components/desktop/DesktopContent.jsx
 import React from "react";
 import { useSelector } from "react-redux";
 import Taskbar from "./Taskbar/Taskbar";
 import Window from "./windows/Window";
 import Desktop from "./Desktop";
 import { windowsMeta } from "./windowsMeta"; // Ajusta la ruta si está en otro lado
import { useTranslation } from "react-i18next";

 export default function DesktopContent() {
   const windows = useSelector((state) => state.windows.windows);
  const { t } = useTranslation();

   return (
     <>
       <Desktop />
       <Taskbar />
       {Object.entries(windows).map(([name, props]) =>
         props.open ? (
           <Window
             key={name}
            title={
             windowsMeta[name]?.titleKey
                ? t(windowsMeta[name].titleKey)
               : (windowsMeta[name]?.title || name) // fallback
           }
             name={name}
           >
             {windowsMeta[name]?.component ? (
               React.createElement(windowsMeta[name].component)
             ) : (
           <p>{t("windows.common.noContent", "Contenido no disponible")}</p>
             )}
           </Window>
         ) : null
       )}
     </>
   );
 }
