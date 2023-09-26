import React from "react";
import "./../globals.css";
import Image from "next/image";

interface IPropsAuthLayout {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IPropsAuthLayout) => {
  return (
    <html>
      <body>
        <section className="h-screen">
          <div className="h-full">
            {/* Left column container with background*/}
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <Image
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  width="0"
                  height="0"  
                  sizes="100vw"
                  loading="lazy"
                  className="w-full"
                  alt="Sample image"
                />
              </div>
              {/* Right column container */}
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-24">
                {children}
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
};

export default AuthLayout;
