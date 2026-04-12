import { motion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToHashElement from "./ScrollToHashElement";
import { useEffect } from "react";

const ARTICLES_CONTENT: Record<string, any> = {
  "what-is-ai-agent": {
    category: "AI",
    title: "AI агент гэж юу вэ? Бизнест хэрхэн ашиглах вэ?",
    date: "2026.03.15",
    readTime: "5 мин",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>AI-г зүгээр л чатбот гэж хардаг үе өнгөрчээ. Одоо таны өмнөөс имэйл бичиж, уулзалт товлож, бүр дата шинжилгээ хийдэг 'дижитал ажилтан'-тай болох боломжтой болсон. Гэхдээ яг хаанаас эхлэх вэ?</p>
      
      <h3>AI агент гэж юу вэ?</h3>
      <p>AI агент гэдэг нь зөвхөн асуултанд хариулаад зогсохгүй, тодорхой зорилгын төлөө бие даан шийдвэр гаргаж, үйлдэл хийх чадвартай программ хангамж юм. Жишээ нь, хэрэглэгчийн гомдлыг хүлээн аваад, түүнийг шийдвэрлэх алхмуудыг хийж, эцэст нь хариу имэйл илгээх хүртэлх бүх процессыг AI агент гүйцэтгэж чадна.</p>

      <h3>Бизнест хэрхэн ашиглах вэ?</h3>
      <ul>
        <li><strong>Харилцагчийн үйлчилгээ:</strong> 24/7 ажиллах ухаалаг туслах.</li>
        <li><strong>Борлуулалт:</strong> Потенциал хэрэглэгчдийг ангилах, уулзалт товлох.</li>
        <li><strong>Дата шинжилгээ:</strong> Маш их хэмжээний өгөгдлийг хэдхэн секундэд боловсруулж, тайлан гаргах.</li>
      </ul>

      <p>Cornerstone AI-ийн хувьд бид бизнес бүрийн онцлогт тохирсон AI агентуудыг хөгжүүлж, үйл ажиллагааг нь хөнгөвчлөхөд тусалдаг.</p>
    `
  },
  "nextjs-vs-wordpress": {
    category: "Технологи",
    title: "Next.js яагаад WordPress-ээс дээр вэ?",
    date: "2026.01.20",
    readTime: "4 мин",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>WordPress бол гайхалтай платформ, гэхдээ орчин үеийн хэрэглэгчид хурдыг хамгийн түрүүнд тавьдаг болсон. Next.js ашигласнаар таны вэбсайт нүд ирмэхийн зуур ачаалж, Google-ийн хайлтад дээгүүр гарах боломж 2 дахин нэмэгдэнэ.</p>

      <h3>Яагаад Next.js гэж?</h3>
      <p>Next.js нь React framework дээр суурилсан бөгөөд Static Site Generation (SSG) болон Server-Side Rendering (SSR) технологийг ашигладаг. Энэ нь вэбсайтыг маш хурдан болгохоос гадна аюулгүй байдлын хувьд WordPress-ээс хамаагүй илүү юм.</p>

      <h3>WordPress-ийн сул тал</h3>
      <p>WordPress нь олон тооны plugin-ууд дээр тогтдог бөгөөд энэ нь вэбсайтыг удаашруулж, халдлагад өртөх эрсдэлийг нэмэгдүүлдэг. Харин Next.js дээр бид зөвхөн хэрэгцээт кодоо бичдэг тул илүү цэвэрхэн, хурдан систем болдог.</p>
    `
  },
  "why-business-needs-website": {
    category: "Бизнес",
    title: "Вэбсайтгүй бизнес яагаад хоцрогдож байна вэ?",
    date: "2025.11.05",
    readTime: "3 мин",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Фэйсбүүк хуудастай байхад вэбсайт хэрэггүй гэж бодож байна уу? Тэгвэл та маш том боломжийг алдаж байна. Вэбсайт бол таны бизнесийн 24/7 ажилладаг 'дижитал оффис' бөгөөд хэрэглэгчийн итгэлийг олох хамгийн гол зэвсэг юм.</p>

      <h3>Итгэлцэл ба Мэргэжлийн харагдах байдал</h3>
      <p>Хэрэглэгчид ямар нэгэн үйлчилгээ авахын өмнө Google-ээс хайдаг. Өөрийн гэсэн вэбсайттай бизнес илүү мэргэжлийн, найдвартай харагддаг. Фэйсбүүк бол зөвхөн сошиал суваг, харин вэбсайт бол таны өмч юм.</p>

      <h3>Дата ба Хяналт</h3>
      <p>Вэбсайт дээрээ та хэрэглэгчдийнхээ зан төлөвийг хянаж, ямар бүтээгдэхүүн илүү сонирхож байгааг мэдэх боломжтой. Энэ өгөгдөл нь маркетингийн зардлаа зөв хуваарилахад тусална.</p>
    `
  },
  "mergejil-com-case-study": {
    category: "Cornerstone",
    title: "Mergejil.com вэб системийг хэрхэн хийсэн бэ?",
    date: "2025.12.12",
    readTime: "6 мин",
    image: "https://lh3.googleusercontent.com/d/1E56NBG6aF2eI87IP9WYDhvetefmxpCs-",
    content: `
      <p>Монголын мянга мянган залууст мэргэжлээ зөв сонгоход нь туслах зорилготой Mergejil.com платформын ард ямар технологи, AI шийдлүүд ажиллаж байгааг сонирхоорой.</p>

      <h3>Төслийн зорилго</h3>
      <p>Залуучууд өөрийн сонирхол, чадварт тохирсон мэргэжлээ сонгох нь тэдний ирээдүйн амжилтын үндэс байдаг. Mergejil.com нь энэхүү сонголтыг шинжлэх ухааны үндэслэлтэй, технологийн тусламжтайгаар хялбаршуулах зорилготой бүтээгдсэн.</p>

      <h3>AI-д суурилсан зөвлөх систем</h3>
      <p>Бид энэ төсөлд хэрэглэгчийн сэтгэлзүйн тест болон сонирхлын асуулгад үндэслэн хамгийн тохиромжтой мэргэжлийг санал болгодог AI алгоритмыг хөгжүүлсэн. Энэ нь зөвхөн тогтсон хариултууд биш, харин хэрэглэгчийн өгөгдөлд дүн шинжилгээ хийж, ирээдүйн чиг хандлагатай уялдуулдаг.</p>

      <h3>Технологийн шийдэл</h3>
      <p>Платформыг Next.js ашиглан маш хурдан ажиллагаатайгаар бүтээж, өгөгдлийн санг Firebase дээр шийдсэн. Мөн хэрэглэгчдэд зориулсан ойлгомжтой Dashboard, мэргэжлүүдийн нэгдсэн сан, их дээд сургуулиудын мэдээллийг нэг дор төвлөрүүлсэн юм.</p>
    `
  },
  "goo-content-agent": {
    category: "AI",
    title: "Goo: Cornerstone AI-н контент агент",
    date: "2026.02.28",
    readTime: "4 мин",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Манай багийн хамгийн идэвхтэй гишүүн Goo-той танилц. Тэр бол зүгээр нэг текст бичигч биш, брэндийн өнгө аясыг мэдэрч, хэрэглэгчдийн сонирхлыг татах контент бүтээгч юм. Бид түүнийг хэрхэн сургаж, ажилдаа ашигладаг вэ?</p>

      <h3>Goo хэрхэн ажилладаг вэ?</h3>
      <p>Goo нь Claude 3.5 Sonnet загвар дээр суурилсан бөгөөд бид түүнд Cornerstone AI-ийн брэнд voice, монгол хэлний найруулга зүйг тусгайлан зааж өгсөн. Тэрээр сошиал медиа пост, блог нийтлэл, рекламны эхийг хэдхэн минутанд бэлтгэдэг.</p>

      <h3>Үр дүн</h3>
      <p>Goo-г ашиглаж эхэлснээр манай контент бэлтгэх хугацаа 80% буурсан. Одоо манай маркетингийн баг зөвхөн стратегийн шийдвэрүүд дээрээ төвлөрөх боломжтой болсон.</p>
    `
  },
  "seo-for-mongolian-companies": {
    category: "Бизнес",
    title: "Монгол компанид SEO яагаад чухал вэ?",
    date: "2026.04.05",
    readTime: "5 мин",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1000&auto=format&fit=crop",
    content: `
      <p>Google-ийн эхний хуудсанд гарах нь сард хэдэн зуун мянган төгрөгийн сурталчилгааны зардлыг хэмнэх боломж юм. Монголын зах зээлд SEO-г зөв ашиглаж чадвал та өрсөлдөгчдөөсөө хэдэн алхам түрүүлж чадна.</p>

      <h3>SEO гэж юу вэ?</h3>
      <p>Search Engine Optimization буюу хайлтын системийн оновчлол нь таны вэбсайтыг Google хайлтад дээгүүр гаргах технологи юм. Монголд ихэнх компаниуд зөвхөн Facebook Ads-т найдаж байгаа энэ үед SEO бол хамгийн хямд бөгөөд үр дүнтэй маркетинг юм.</p>

      <h3>Хэрхэн эхлэх вэ?</h3>
      <p>Хамгийн түрүүнд вэбсайтынхаа хурдыг сайжруулж, хэрэглэгчдийн хайж буй түлхүүр үгсийг агуулсан чанартай контент оруулах хэрэгтэй. Cornerstone AI нь таны вэбсайтыг техникийн талаас нь бүрэн оновчилж өгдөг.</p>
    `
  }
};

export default function InsightDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = slug ? ARTICLES_CONTENT[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article && slug) {
      // If article not found, maybe redirect or show error
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] text-[#F0EBE0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Нийтлэл олдсонгүй</h1>
          <Link to="/insights" className="text-[#C49A3C] hover:underline">Мэдээлэл рүү буцах</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F0EBE0] selection:bg-gold-500 selection:text-navy-900">
      <Navbar />
      <ScrollToHashElement />
      
      {/* Subtle grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(196,154,60,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(196,154,60,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} 
      />

      <main className="relative z-10 pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/insights')}
            className="inline-flex items-center gap-2 text-[#6B7A99] hover:text-[#C49A3C] transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Буцах
          </button>

          {/* Article Header */}
          <div className="mb-12">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-[#C49A3C] mb-6 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-[#6B7A99]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/5">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-gold max-w-none">
            <div 
              className="text-lg text-[#F0EBE0]/80 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Footer Actions */}
          <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#C49A3C]/30 transition-all">
                <Share2 className="w-5 h-5 text-[#6B7A99]" />
              </button>
            </div>
            <Link 
              to="/#contact"
              className="px-8 py-3 bg-[#C49A3C] text-[#0A0F1E] rounded-full font-bold text-sm hover:bg-[#D4AA4C] transition-all"
            >
              Төсөл эхлүүлэх
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
