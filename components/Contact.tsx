/**
 * قسم التواصل (Contact Section).
 */
import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
