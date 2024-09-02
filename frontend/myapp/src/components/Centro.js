/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const flexStyles = css`
  display: flex;
  justify-content: center;
  margin: 50px auto;
  max-width: 1400px;
  gap: 20px;

  img {
    height: 450px;
  }
`;

const columnStyles = css`
  display: flex;
  flex-direction: column;

  .description {
    max-width: 550px;
    margin-bottom: 30px;
  }
`;

const containerStyles = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 100px auto; /* Aumentar la separación entre la primera y segunda sección */
  max-width: 1400px; /* Alinear las cartas con el mismo ancho que la sección anterior */
`;

const cardStyles = css`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .content {
    padding: 20px;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .date {
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 10px;
  }

  .read-more {
    color: #1a73e8;
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: bold;
  }

  .read-more:hover {
    text-decoration: underline;
  }
`;

export function GrowthSection() {
  return (
    <div>
      <section css={flexStyles}>
        <div css={columnStyles}>
          <h4>Growth & ROI</h4>
          <h1>Supera tus límites</h1>
          <h3 className="description">
            Use URL parameters to deliver dynamic & personalized images. Works
            perfectly for email marketing campaigns, E-commerce stores.
          </h3>
        </div>
        <div>
          <img src="static/imagenes/autobelay.jpg" alt="" />
        </div>
      </section>

      {/* Nueva Sección de Artículos */}
      <section css={containerStyles}>
        <div css={cardStyles}>
          <img src="imagenes/descanso.jpg" alt="Impacto del sueño y descanso en la escalada" />
          <div className="content">
            <h3>IMPACTO DEL SUEÑO Y DORMIR POCO EN EL RENDIMIENTO ESCALANDO</h3>
            <div className="date">19/07/2024</div>
            <p>
              Al querer subir de grado escalando, entrenar más y más duro es la
              mejor opción que viene a la mente. Pero la ajetreada vida actual obliga a rasgar minutos de...
            </p>
          
          </div>
        </div>

        <div css={cardStyles}>
          <img src="imagenes/entrenamiento.jpg" alt="Efectos del entrenamiento para escalada" />
          <div className="content">
            <h3>EFECTOS DEL ENTRENAMIENTO PARA ESCALADA</h3>
            <div className="date">12/07/2024</div>
            <p>
              Al entrenar, tu cuerpo va generando una serie de adaptaciones fisiológicas.
              Algunas suceden de manera aguda, mientras otras necesitan de más tiempo durante el que mantienes los estímulos adecuados...Al entrenar, tu cuerpo va generando una serie de adaptaciones fisiológicas.
              Algunas suceden de manera aguda, mientras otras necesitan de más tiempo durante el que mantienes los estímulos adecuados...Al entrenar, tu cuerpo va generando una serie de adaptaciones fisiológicas.
              Algunas suceden de manera aguda, mientras otras necesitan de más tiempo durante el que mantienes los estímulos adecuados...sAl entrenar, tu cuerpo va generando una serie de adaptaciones fisiológicas.
              Algunas suceden de manera aguda, mientras otras necesitan de más tiempo durante 
            </p>
            
          </div>
        </div>

        <div css={cardStyles}>
          <img src="imagenes/glutamina.jpg" alt="Evidencia sobre la L-glutamina para escaladores" />
          <div className="content">
            <h3>EVIDENCIA SOBRE LA L-GLUTAMINA ¿ES ÚTIL PARA ESCALADORES?</h3>
            <div className="date">05/07/2024</div>
            <p>
            En el mercado hay muchos suplementos deportivos. Entre ellos, la L-glutamina tiene cierta popularidad.
            Sin embargo, los estudios no son concluyentes sobre los usos que se le atribuyen...En el mercado hay muchos suplementos deportivos. Entre ellos, la L-glutamina tiene cierta popularidad.
            Sin embargo, los estudios no son concluyentes sobre los usos que se le atribuyen...En el mercado hay muchos suplementos deportivos. Entre ellos, la L-glutamina tiene cierta popularidad.
            Sin embargo, los estudios no son concluyentes sobre los usos que se le atribuyen...
            </p>
         
          </div>
        </div>
      </section>
    </div>
  );
}
