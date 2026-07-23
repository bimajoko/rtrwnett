import { useState } from "react";
import { useSiteData } from "../../hooks/useSiteData";

export function Faq() {
  const { faq } = useSiteData();
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section className="section section--alt" id="faq">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow">FAQ</span>
          <h2>Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div className="faq-list">
          {faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="faq-item__q"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <span>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="faq-item__a">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
