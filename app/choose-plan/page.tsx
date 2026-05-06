'use client'
import React, { useState } from 'react'
import styles from '../chooseplan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faSeedling, faHandshake } from '@fortawesome/free-solid-svg-icons';


export default function ChoosePlan() {

    const [selected, setSelected] = useState("yearly");

    const faqs = [
    {
        question: "How does the free 7-day trial work?",
        answer:
        "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
        question:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly? ",
        answer: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
        question: "What's included in the Premium plan?",
        answer: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
        question: "Can I cancel during my trial or subscription?",
        answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
    ];

    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };
        
    return (

    <>
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <h1>
                Get unlimited access to many amazing books to read
                </h1>

                <p>Turn ordinary moments into amazing learning opportunities</p>
            </div>

        
            <div className={styles.heroImage}>
                <img src="/plan_img.png" alt="illustration" />
            </div>
        </section>

        <section className={styles.features}>
            <div className={styles.featuresWrapper}>
                <div className={styles.feature}>
                    <FontAwesomeIcon icon={faFile} className={styles.fontawesomeIcon}/>
                    <p><span className={styles.bold}>Key ideas in few min </span> with many books to read</p>
                </div>
                <div className={styles.feature}>
                    <FontAwesomeIcon icon={faSeedling} className={styles.fontawesomeIcon} />
                    <p><span className={styles.bold}>3 million</span> people growing with Summarist everyday</p>
                </div>
                <div className={styles.feature}>
                    <FontAwesomeIcon icon={faHandshake} className={styles.fontawesomeIcon}/>
                    <p><span className={styles.bold}>Precise recommendations </span> collections curated by experts</p>
                </div>
            </div>
        </section>

        <section className={styles.plans}>
            <h1 className={styles.sectionTitle}>Choose the plan that fits you</h1>
            <label className={styles.planCard + (selected === 'yearly' ? ' ' + styles.active : '')}
                onClick={() => setSelected("yearly")}>
                <input type="radio" name="plan" 
                checked={selected === "yearly"}
                readOnly/>

                <div className={styles.planContent}>
                <p className={styles.planTitle}>Premium Plus Yearly</p>
                <h2>$99.99/year</h2>
                <span className={styles.planNote}>7-day free trial included</span>
                </div>
            </label>

            <div className={styles.divider}>
                <span>or</span>
            </div>

            <label className={styles.planCard + (selected === 'monthly' ? ' ' + styles.active : '')}
                onClick={() => setSelected("monthly")}>
                <input type="radio" name="plan" checked={selected === "monthly"}
                    readOnly/>
                <div className={styles.planContent}>
                <p className={styles.planTitle}>Premium Monthly</p>
                <h2>$9.99/month</h2>
                <span className={styles.planNote + " " + styles.muted}>No trial included</span>
                </div>
            </label>
        </section>
       
        <div className={styles.ctaWrapper}>
            {selected === 'yearly'? (
                <>
                    <button className={styles.ctaBtn}>
                    Start your free 7-day trial
                    </button>
                    <p className={styles.planNote}>Cancel your trial at any time before it ends, and you won’t be charged.</p>
                </>   
            ):(
               <>
                    <button className={styles.ctaBtn}>
                    Start your first month
                    </button>
                    <p className={styles.planNote}>30-day money back guarantee, no questions asked.</p>
                </>  
            )}
        </div>

        <div className={styles.faq}>
        {faqs.map((item, index) => (
            <div key={index} className={styles.item}>
            <button
                className={styles.question}
                onClick={() => toggle(index)}
            >
                {item.question}
                <span className={styles.icon}>
                {openIndex === index ? "▴" : "▾"}
                </span>
            </button>

            {openIndex === index && (
                <p className={styles.answer}>{item.answer}</p>
            )}
            </div>
        ))}
        </div>

        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                <div className={styles.column}>
                <h4>Actions</h4>
                <a href="#">Summarist Magazine</a>
                <a href="#">Cancel Subscription</a>
                <a href="#">Help</a>
                <a href="#">Contact us</a>
                </div>

                <div className={styles.column}>
                <h4>Useful Links</h4>
                <a href="#">Pricing</a>
                <a href="#">Summarist Business</a>
                <a href="#">Gift Cards</a>
                <a href="#">Authors & Publishers</a>
                </div>

                <div className={styles.column}>
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Partners</a>
                <a href="#">Code of Conduct</a>
                </div>

                <div className={styles.column}>
                <h4>Other</h4>
                <a href="#">Sitemap</a>
                <a href="#">Legal Notice</a>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policies</a>
                </div>

            </div>

            <div className={styles.copyright}>
                Copyright © 2026 Summarist.
            </div>
        </footer>

    </>

  )
}