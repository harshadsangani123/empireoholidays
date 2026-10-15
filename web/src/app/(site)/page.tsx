import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import { apiGet, type PackageSummary } from "@/lib/api";
import { getMetaField, pageMetadata } from "@/lib/seo";
import HeroSlider from "./HeroSlider";

const DEFAULT_SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1534751516649-d43b49f152a9?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
];

export async function generateMetadata() {
  const home = await apiGet<{ metaData: unknown }>("/cms-pages/home");
  return pageMetadata({
    title: getMetaField(home.metaData, "meta_title") ?? "Empireo Holidays | Domestic & International Tour Packages",
    description:
      getMetaField(home.metaData, "meta_description") ??
      "Explore domestic and international tour packages with Empireo Holidays. Book honeymoon, family, group and corporate holidays with flight, hotel, visa and travel assistance.",
    path: "/",
  });
}

export default async function Home() {
  const [featuredInternational, featuredDomestic, home] = await Promise.all([
    apiGet<PackageSummary[]>("/packages?type=international&featured=1"),
    apiGet<PackageSummary[]>("/packages?type=domestic&featured=1"),
    apiGet<{ heroBackgrounds: string[] }>("/cms-pages/home"),
  ]);

  const sliderImages = home.heroBackgrounds.length ? home.heroBackgrounds : DEFAULT_SLIDER_IMAGES;

  return (
    <main className="main-content">
      <section className="video-hero slider-hero">
        <HeroSlider images={sliderImages} />
        <div className="video-overlay"></div>
        <div className="video-hero-content">
          <div className="container">
            <h1 className="video-hero-title">
              Explore the World with
              <br />
              Empireo Holidays
            </h1>
            <p className="video-hero-subtitle">
              For those who do everything beautifully —
              <br />
              your premier platform for wellness, fitness, and creative travel experiences
            </p>
            <div className="video-hero-buttons">
              <Link href="/international" className="btn-hero btn-hero-primary">
                Explore International
              </Link>
              <Link href="/domestic" className="btn-hero btn-hero-secondary">
                Explore Domestic
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h2>Your Trusted Travel Agency</h2>
            <p>
              Empireo Holidays is a travel agency and tour operator helping travelers plan domestic and
              international holidays across India and worldwide. From honeymoon and family holidays to group tours
              and corporate trips, we take care of flights, hotels, trains, and passport and visa assistance — so
              planning your next holiday package is simple, personal, and worry-free.
            </p>
          </div>
        </div>
      </section>

      <section className="packages-section">
        <div className="container">
          <div className="section-title">
            <h2>Popular International Packages</h2>
            <p>Unforgettable trips around the world</p>
          </div>
          <div className="grid grid-3">
            {featuredInternational.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} type="international" />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/international" className="btn btn-primary">
              View More International Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="packages-section">
        <div className="container">
          <div className="section-title">
            <h2>Top Domestic Packages</h2>
            <p>Explore the beauty of India</p>
          </div>
          <div className="grid grid-4">
            {featuredDomestic.slice(0, 4).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} type="domestic" />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/domestic" className="btn btn-primary">
              View More Domestic Packages
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Empireo Holidays</h2>
            <p>We make your travel simple, memorable, and worry‑free</p>
          </div>
          <div className="why-choose-grid">
            <div className="why-card">
              <div className="why-icon">👤</div>
              <h3>Personalised Travel Experiences</h3>
            </div>
            <div className="why-card">
              <div className="why-icon">⚙️</div>
              <h3>Comprehensive Services</h3>
            </div>
            <div className="why-card">
              <div className="why-icon">🎯</div>
              <h3>Expert Guidance</h3>
            </div>
            <div className="why-card">
              <div className="why-icon">🌍</div>
              <h3>Global & Domestic Reach</h3>
            </div>
            <div className="why-card">
              <div className="why-icon">💰</div>
              <h3>Competitive Pricing</h3>
            </div>
            <div className="why-card">
              <div className="why-icon">📞</div>
              <h3>24/7 Support</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="service-types-section">
        <div className="container">
          <div className="section-title">
            <h2>Everything You Need for Your Trip</h2>
            <p>Fast, easy, and hassle‑free booking awaits</p>
          </div>
          <div className="service-types-grid">
            <div className="service-card">
              <div className="service-icon">✈️</div>
              <h3>Flight tickets</h3>
              <p>Book domestic and international flights in just a few clicks.</p>
              <Link href="/contact" className="service-book-btn">
                Book Now
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🚆</div>
              <h3>Train Ticket</h3>
              <p>Reserve train seats quickly with our hassle‑free support.</p>
              <Link href="/contact" className="service-book-btn">
                Book Now
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🚖</div>
              <h3>Transportation</h3>
              <p>Arrange airport transfers, cabs, and local sightseeing travel.</p>
              <Link href="/contact" className="service-book-btn">
                Book Now
              </Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🏨</div>
              <h3>Hotel booking</h3>
              <p>Find and book comfortable stays at the best available rates.</p>
              <Link href="/contact" className="service-book-btn">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
