import { useEffect, useRef, useState } from 'react'
import './App.css'
import BlurText from './components/BlurText.jsx'
import StaggeredMenu from './components/StaggeredMenu.jsx'

const PHONE_DISPLAY = '(973) 277-0374'
const PHONE_LINK = 'tel:+19732770374'
const ADDRESS = '133 River Dr, Garfield, NJ 07026'
const HOURS_DISPLAY = 'Mon-Fri 8:30am-6pm; Sat 9am-4pm'
const BUSINESS_HOURS = [
  { days: 'Mon-Fri', hours: '8:30am-6pm' },
  { days: 'Saturday', hours: '9am-4pm' },
  { days: 'Sunday', hours: 'Closed' },
]
const MAPS_URL =
  'https://www.google.com/maps/place/MTR+Auto+Detail+and+Auto+Care+Services/@40.8640673,-74.107533,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2f91d34b7b6bb:0x27692c57dba7643c!8m2!3d40.8640673!4d-74.107533!16s%2Fg%2F11qnlxn9qt?entry=ttu'
const MOBILE_MENU_QUERY = '(max-width: 760px)'
const LOGO_URL = `${import.meta.env.BASE_URL}favicon.ico`
const SOCIAL_LINKS = [
  { label: 'Instagram', link: 'https://www.instagram.com/' },
  { label: 'Facebook', link: 'https://www.facebook.com/' },
  { label: 'TikTok', link: 'https://www.tiktok.com/' },
]

const asset = (fileName) => `${import.meta.env.BASE_URL}images/${fileName}`

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to the home section', link: '#home' },
  { label: 'Services', ariaLabel: 'View our services', link: '#services' },
  { label: 'About', ariaLabel: 'Learn about MTR', link: '#about' },
  { label: 'Visit Us', ariaLabel: 'View shop information', link: '#visit' },
  { label: 'Contact', ariaLabel: 'View contact options', link: '#contact' },
]

const services = [
  {
    title: 'Computer Diagnostics',
    meta: 'Fault tracing, scan data, test verification',
    image: asset('diagnostics.jpg'),
    alt: 'Technician inspecting a vehicle engine during diagnostics',
  },
  {
    title: 'Brake Systems',
    meta: 'Pads, rotors, hydraulics, safety inspection',
    image: asset('brakes.jpg'),
    alt: 'Mechanic repairing a vehicle brake assembly in a garage',
  },
  {
    title: 'Factory Maintenance',
    meta: 'Oil service, fluids, filters, scheduled care',
    image: asset('maintenance.jpg'),
    alt: 'Vehicle lifted for maintenance in a modern auto service bay',
  },
  {
    title: 'General Mechanic',
    meta: 'Suspension, drivability, electrical, repair work',
    image: asset('mechanic.jpg'),
    alt: 'Mechanic working inside a vehicle engine bay',
  },
  {
    title: 'Detailing & Finish',
    meta: 'Full detail, headlight restoration, scratch removal',
    image: asset('detailing.jpg'),
    alt: 'Detail technician buffing paint on a vehicle panel',
  },
]

const shopHighlights = [
  {
    name: 'Repair Estimates',
    note: 'Clear findings, practical options, and no-pressure recommendations',
    image: asset('mechanic.jpg'),
    alt: 'Mechanic working inside a vehicle engine bay',
  },

  {
    name: 'Preventive Maintenance',
    note: 'Oil service, filters, fluids, brakes, and scheduled inspections',
    image: asset('maintenance.jpg'),
    alt: 'Vehicle lifted for maintenance in a modern auto service bay',
  },
]

const AnimatedText = ({ delay = 35, stepDuration = 0.28, ...props }) => (
  <BlurText delay={delay} stepDuration={stepDuration} {...props} />
)

function SocialIcon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" className="social-icon-fill" />
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="social-icon-fill"
          d="M13.8 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4V10H8.2v3h2.6v8h3Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="social-icon-fill"
        d="M15 3c.3 2.1 1.5 3.4 3.6 3.6v3.1c-1.3 0-2.5-.4-3.6-1.1v5.8a6 6 0 1 1-5.2-6V12a2.5 2.5 0 1 0 1.7 2.4V3H15Z"
      />
    </svg>
  )
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()
    mediaQuery.addEventListener('change', updateMatch)
    return () => mediaQuery.removeEventListener('change', updateMatch)
  }, [query])

  return matches
}

function App() {
  const showMobileMenu = useMediaQuery(MOBILE_MENU_QUERY)
  const heroRef = useRef(null)
  const [headerState, setHeaderState] = useState({
    isScrolled: false,
    isHidden: false,
  })

  useEffect(() => {
    let previousScrollY = window.scrollY
    let animationFrameId

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0)
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0
      const isOutsideHero = heroBottom <= 0
      const isScrollingDown = currentScrollY > previousScrollY
      const isScrollingUp = currentScrollY < previousScrollY

      setHeaderState((currentState) => {
        const nextState = {
          isScrolled: isOutsideHero,
          isHidden: isOutsideHero
            ? isScrollingDown || (!isScrollingUp && currentState.isHidden)
            : false,
        }

        return nextState.isScrolled === currentState.isScrolled &&
          nextState.isHidden === currentState.isHidden
          ? currentState
          : nextState
      })

      previousScrollY = currentScrollY
      animationFrameId = undefined
    }

    const handleScroll = () => {
      if (animationFrameId === undefined) {
        animationFrameId = window.requestAnimationFrame(updateHeader)
      }
    }

    updateHeader()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId !== undefined) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect()

      if (rect.top <= viewportHeight * 0.96) {
        item.classList.add('is-visible')
        return
      }

      observer.observe(item)
    })

    document.documentElement.classList.add('reveal-enabled')

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('reveal-enabled')
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="static-background" aria-hidden="true">
        <img
          src={asset('background static.png')}
          alt=""
          fetchPriority="high"
        />
      </div>

      {showMobileMenu && (
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering
          menuButtonColor="#1a1a1a"
          openMenuButtonColor="#1a1a1a"
          changeMenuColorOnOpen
          colors={['#1a1a1a', '#d5001c']}
          logoUrl={LOGO_URL}
          accentColor="#d5001c"
          isFixed
        />
      )}

      <main>
        <section
          className="hero-section"
          id="home"
          ref={heroRef}
          style={{
            '--hero-background-image': `url("${asset('MTR hero section.jpg')}")`,
          }}
        >
          <header
            className={`site-header${headerState.isScrolled ? ' is-scrolled' : ''}${headerState.isHidden ? ' is-hidden' : ''}`}
            aria-label="Primary navigation"
          >
            <div className="header-inner">
              <a className="header-brand" href="#home" aria-label="MTR home">
                <img
                  className="header-logo"
                  src={asset('footer-logo.png')}
                  alt="MTR Auto Detail and Auto Care Services"
                />
              </a>
              <nav className="nav-links" aria-label="Site sections">
                <AnimatedText
                  as="a"
                  className="nav-link-active"
                  href="#home"
                  text="Home"
                  delay={70}
                />
                <AnimatedText
                  as="a"
                  href="#services"
                  text="Services"
                  delay={70}
                />
                <AnimatedText as="a" href="#about" text="About" delay={70} />
                <AnimatedText as="a" href="#visit" text="Visit Us" delay={70} />
                <AnimatedText
                  as="a"
                  href="#contact"
                  text="Contact"
                  delay={70}
                />
              </nav>
              <a className="header-phone" href={PHONE_LINK}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </header>

          <div className="hero-content">
            <AnimatedText
              className="eyebrow"
              text="Garfield, NJ precision auto care"
              delay={80}
            />
            <AnimatedText
              as="h1"
              className="hero-title"
              text={'DIAGNOSE \u2022 REPAIR \u2022 PERFORMANCE'}
              delay={140}
              animateBy="words"
              direction="top"
              aria-label="Diagnose, repair, performance"
            />
            <AnimatedText
              className="hero-copy"
              text="Disciplined diagnostics, transparent recommendations, and meticulous auto care for drivers who expect the work to be explained clearly and completed correctly."
              delay={45}
            />
            <div className="hero-actions">
             
              <AnimatedText
                as="a"
                className="button button-secondary button-large"
                href={PHONE_LINK}
                text={`Call ${PHONE_DISPLAY}`}
                delay={80}
              />
            </div>

            <div className="hero-proof" aria-label="Shop highlights">
              <div>
                <AnimatedText
                  as="span"
                  className="hero-proof-label"
                  text="Address"
                  delay={60}
                />
                <AnimatedText
                  as="strong"
                  className="hero-proof-value"
                  text={ADDRESS}
                  delay={45}
                />
              </div>
              <div>
                <AnimatedText
                  as="span"
                  className="hero-proof-label"
                  text="Hours"
                  delay={60}
                />
                <AnimatedText
                  as="strong"
                  className="hero-proof-value"
                  text={HOURS_DISPLAY}
                  delay={45}
                />
              </div>
              <div>
                <AnimatedText
                  as="span"
                  className="hero-proof-label"
                  text="Service Scope"
                  delay={60}
                />
                <AnimatedText
                  as="strong"
                  className="hero-proof-value"
                  text="Detailing, diagnostics, brakes, oil changes"
                  delay={45}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-header" data-reveal>
            <AnimatedText
              as="p"
              className="section-kicker"
              text="Our Services"
            />
            <AnimatedText
              as="h2"
              text="Clinical process. Mechanical confidence."
            />
          </div>

          <div className="services-grid" data-reveal>
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-media">
                  <img src={service.image} alt={service.alt} loading="lazy" />
                </div>
                <div className="service-content">
                  <AnimatedText as="h3" text={service.title} />
                  <AnimatedText as="p" text={service.meta} delay={25} />
                </div>
              </article>
            ))}
          </div>

          <div className="service-copy" data-reveal>
            <AnimatedText
              as="p"
              text="MTR handles the complete care cycle: routine factory maintenance, computer diagnostics, brake service, general mechanical repair, oil changes, full auto detail, interior and exterior care, headlight restoration, hand wax, window tint removal, decal removal, scratch removal, and finish correction. Every visit is built around clear findings, practical options, and work that respects the vehicle."
              delay={20}
            />
          
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <AnimatedText
                as="p"
                className="section-kicker"
                text="About the Company"
              />
              <AnimatedText
                as="h2"
                text="Hands-on auto care with a builder's attention to detail."
              />
              <AnimatedText
                as="p"
                text="MTR Auto Detail and Auto Care Services was shaped around a simple standard: inspect thoroughly, explain the work plainly, and treat each vehicle like a project worth doing right. The shop blends mechanical repair and finish care, so daily drivers and enthusiast cars can leave sharper, safer, and better sorted."
                delay={20}
              />
              <AnimatedText
                as="p"
                text="That labor-of-love philosophy shows up in the small decisions: checking the cause before replacing parts, protecting clean surfaces during service, and giving customers a direct path from first concern to confirmed repair."
                delay={20}
              />
             
            </div>

            <div className="about-image" data-reveal>
              <img
                src={asset('about-mechanic.jpg')}
                alt="Mechanic using a socket wrench on an engine assembly"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section merch-section" id="store">
          <div className="section-header" data-reveal>
            <AnimatedText
              as="p"
              className="section-kicker"
              text="Shop Support"
            />
            <AnimatedText
              as="h2"
              text="Helpful service guidance before the repair begins."
            />
          </div>

          <div className="merch-grid" data-reveal>
            {shopHighlights.map((item) => (
              <article className="merch-card" key={item.name}>
                <div className="merch-media">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>
                <div className="merch-content">
                  <AnimatedText as="h3" text={item.name} />
                  <AnimatedText as="p" text={item.note} delay={25} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="visit">
          <div className="contact-layout" data-reveal>
            <div className="visit-panel">
              <AnimatedText
                as="p"
                className="section-kicker"
                text="Visit Us"
              />
              <AnimatedText
                as="h2"
                text="MTR Auto Detail and Auto Care Services."
              />
              <dl className="visit-details">
                <div>
                  <AnimatedText as="dt" text="Address" />
                  <AnimatedText as="dd" text={ADDRESS} />
                </div>
                <div>
                  <AnimatedText as="dt" text="Hours" />
                  <dd>
                    <div className="hours-list" aria-label="Business hours">
                      {BUSINESS_HOURS.map((item) => (
                        <div className="hours-row" key={item.days}>
                          <AnimatedText as="span" text={item.days} delay={25} />
                          <AnimatedText
                            as="strong"
                            text={item.hours}
                            delay={25}
                          />
                        </div>
                      ))}
                    </div>
                  </dd>
                </div>
                <div>
                  <AnimatedText as="dt" text="Phone" />
                  <dd>
                    <AnimatedText
                      as="a"
                      href={PHONE_LINK}
                      text={PHONE_DISPLAY}
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="form-panel" id="contact">
              <AnimatedText
                as="p"
                className="section-kicker"
                text="Contact"
              />
              <AnimatedText
                as="h2"
                text="Call or open the local listing before you come in."
              />
              <AnimatedText
                as="p"
                className="contact-copy"
                text="The shop is listed as an auto detailing service, auto repair shop, and repair service at 133 River Dr in Garfield."
                delay={25}
              />
              <div className="contact-actions">
                <AnimatedText
                  as="a"
                  className="button button-primary"
                  href={PHONE_LINK}
                  text={`Call ${PHONE_DISPLAY}`}
                />
                <AnimatedText
                  as="a"
                  className="button button-secondary"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  text="Open Maps"
                />
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer
        className="site-footer"
        style={{
          '--footer-background-image': `url("${asset('MTR hero section.jpg')}")`,
        }}
      >
        <div className="footer-main">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src={asset('footer-logo.png')}
              alt="MTR"
            />
            <AnimatedText as="p" text="Auto Detail & Auto Care Services" />
          </div>
          <div className="footer-table">
            <section className="footer-field">
              <AnimatedText
                as="h2"
                className="footer-field-title"
                text="Navigation"
              />
              <nav className="footer-nav" aria-label="Footer links">
                <AnimatedText as="a" href="#services" text="Services" />
                <AnimatedText as="a" href="#about" text="About" />
                <AnimatedText as="a" href="#visit" text="Visit Us" />
                <AnimatedText as="a" href="#contact" text="Contact" />
              </nav>
            </section>
            <section className="footer-field">
              <AnimatedText
                as="h2"
                className="footer-field-title"
                text="Contact"
              />
              <div className="footer-contact-list">
                <div>
                  <AnimatedText
                    as="span"
                    className="footer-contact-label"
                    text="Address"
                  />
                  <AnimatedText as="p" text={ADDRESS} />
                </div>
                <div>
                  <AnimatedText
                    as="span"
                    className="footer-contact-label"
                    text="Phone"
                  />
                  <AnimatedText as="a" href={PHONE_LINK} text={PHONE_DISPLAY} />
                </div>
                <div>
                  <AnimatedText
                    as="span"
                    className="footer-contact-label"
                    text="Hours"
                  />
                  <AnimatedText as="p" text={HOURS_DISPLAY} />
                </div>
              </div>
            </section>
            <section className="footer-field">
              <AnimatedText
                as="h2"
                className="footer-field-title"
                text="Quick Actions"
              />
              <div className="footer-actions">
                <AnimatedText
                  as="a"
                  className="button button-primary"
                  href={PHONE_LINK}
                  text="Call Now"
                />
                <AnimatedText
                  as="a"
                  className="button button-secondary"
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  text="Get Directions"
                />
              </div>
            </section>
          </div>
        </div>
        <AnimatedText
          as="p"
          className="footer-privacy"
          text="No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties."
          delay={20}
        />
        <nav className="footer-socials" aria-label="Social media">
          {SOCIAL_LINKS.map((social) => (
            <a
              href={social.link}
              key={social.label}
              target="_blank"
              rel="noreferrer"
              aria-label={`MTR on ${social.label}`}
            >
              <SocialIcon name={social.label} />
            </a>
          ))}
        </nav>
      </footer>

     
    </div>
  )
}

export default App
