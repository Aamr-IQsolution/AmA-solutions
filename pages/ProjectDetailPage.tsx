import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LocalizedLink, LocalizedNavigate } from '../components/LocalizedLink';
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';
import { getTechIcon } from '../utils/techIconMap';
import ProjectDetailHero from '../components/project/ProjectDetailHero';
import ProjectDetailGallery from '../components/project/ProjectDetailGallery';
import ProjectLightbox from '../components/project/ProjectLightbox';
import { getProjectDetailCopy } from '../components/project/projectDetailCopy';
import styles from './ProjectDetailPage.module.css';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const { lang, config, isRTL } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setSelectedImage(null), []);
  const project = config.portfolio.find((p) => p.id === id);

  // Keep hooks above; only navigate after all hooks in this component have run.
  if (!project) return <LocalizedNavigate to="/portfolio" replace />;

  const t = project.translations[lang];
  const copy = getProjectDetailCopy(lang);
  const showChallengeSolution = Boolean(t.challenge || t.solution);
  const technologies = project.technologies?.filter(Boolean) ?? [];
  const galleryImages = project.galleryImages?.filter(Boolean) ?? [];

  return (
    <div className={styles.page}>
      <SEO
        title={`${t.title} – ${t.category} | AxonXcode`}
        description={t.shortDescription}
        path={`/portfolio/${project.id}`}
        image={project.coverImage}
      />
      <div className={styles.inner}>
        <ProjectDetailHero
          project={project}
          lang={lang}
          title={t.title}
          category={t.category}
          shortDescription={t.shortDescription}
        />

        <div className={styles.topNav}>
          <LocalizedLink to="/portfolio" className={styles.backLink}>
            <i className={`fa-solid fa-chevron-${lang === 'ar' ? 'right' : 'left'}`} aria-hidden />
            {copy.backText}
          </LocalizedLink>
          <span className={styles.statusBadge}>{t.statusLabel}</span>
        </div>

        {showChallengeSolution ? (
          <section className={`${styles.section} ${styles.twoCol}`}>
            {t.challenge ? (
              <div>
                <h2 className={styles.sectionTitle}>{copy.challengeTitle}</h2>
                <p className={styles.paragraph}>{t.challenge}</p>
              </div>
            ) : (
              <div />
            )}
            {t.solution ? (
              <div>
                <h2 className={styles.sectionTitle}>{copy.solutionTitle}</h2>
                <p className={styles.paragraph}>{t.solution}</p>
              </div>
            ) : (
              <div />
            )}
          </section>
        ) : null}

        {technologies.length > 0 ? (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{copy.techTitle}</h2>
            <div className={styles.chips}>
              {technologies.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span key={tech} className={styles.chip}>
                    {Icon ? <Icon className={styles.chipIcon} aria-hidden /> : null}
                    {tech}
                  </span>
                );
              })}
            </div>
          </section>
        ) : null}

        {galleryImages.length > 0 ? (
          <ProjectDetailGallery
            images={galleryImages}
            isRTL={isRTL}
            lang={lang}
            title={copy.galleryTitle}
            prevLabel={copy.galleryPrevLabel}
            nextLabel={copy.galleryNextLabel}
            hasFictionalData={project.hasFictionalData}
            onSelectImage={setSelectedImage}
          />
        ) : null}

        <div className={styles.section}>
          <div className={styles.actions}>
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                {copy.visitLive}
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.ctaBox}>
          <p className={styles.ctaText}>{copy.ctaText}</p>
          <LocalizedLink to="/contact" className={styles.ghostBtn}>
            {copy.contactBtn}
          </LocalizedLink>
        </div>
      </div>

      {selectedImage ? (
        <ProjectLightbox
          src={selectedImage}
          closeLabel={copy.closeLightboxLabel}
          hasFictionalData={project.hasFictionalData}
          onClose={closeLightbox}
        />
      ) : null}
    </div>
  );
};

export default ProjectDetailPage;
