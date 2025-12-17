import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background with simple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-1 bg-white border border-blue-100 shadow-sm px-4 py-1.5 rounded-full mb-8">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-800">大阪府堺市・地域密着</span>
        </div>

        {/* Main Copy */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          現場の『めんどくさい』を<br className="hidden md:block" />
          ITの力で<span className="text-blue-600 relative whitespace-nowrap">
            『自動化』
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
          します。
        </h1>

        {/* Sub Copy */}
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          毎日のExcel集計、手書きの伝票整理...。<br />
          システム開発のプロが、あなたの会社の事務作業を劇的に効率化します。
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#services">
            <Button variant="primary" className="w-full sm:w-auto gap-2">
              できることを見る
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" className="w-full sm:w-auto">
              まずは相談してみる
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};