import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { getPublicPublications, likePublication } from '../services/publication';
import moment from 'moment';

const Publications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getPublicPublications()
      .then(data => {
        setPublications(data);
      })
      .catch(error => {
        console.error('Error fetching public publications:', error);
      });
  }, []);

  const handleLike = async (publicationId) => {
    try {
      const response = await likePublication(publicationId);
      setPublications(prevPublications =>
        prevPublications.map(pub =>
          pub.id === publicationId ? { ...pub, likes_count: response.likes_count } : pub
        )
      );
    } catch (error) {
      console.error('Error liking publication:', error);
    }
  };

  return (
    <div>
      <BarraNavegacion />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        {publications && Array.isArray(publications) && publications.length > 0 ? (
          publications.map(pub => (
            pub.training_id ? (
              <Article to={`/sesion/${pub.training_id}`} key={pub.id}> {/* Enlace correcto usando `Link` */}
                <SharedActor>
                  <button>
                    <img src="/imagenes/fotocv.jpg" alt="Profile" />
                    <div>
                      <h3>
                        {pub.user_name || 'Unknown User'}
                        <br />
                        <div>
                          <img src="/imagenes/clock.png" alt="Clock" />
                          <span>{moment(pub.created_at).fromNow()}</span>
                          <img src="/imagenes/language.png" alt="Public" />
                          <span>Public</span>
                        </div>
                      </h3>
                    </div>
                  </button>
                </SharedActor>
                <MessageBox>
                  <span>{pub.training_name || 'No content available'}</span>
                </MessageBox>
                <ActionsPub>
                  <div>
                    <img src="/imagenes/like.png" alt="Like" />
                    <span>
                      <b>{pub.likes_count}</b> likes
                    </span>
                  </div>
                </ActionsPub>
                <ArticleButtons>
                  <button onClick={() => handleLike(pub.id)}>
                    <img src="/imagenes/like.png" alt="Like" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/imagenes/comente.png" alt="Comment" />
                    <span>Comment</span>
                  </button>
                  <div>
                    <span>0 comments</span>
                    <span>0 shares</span>
                  </div>
                </ArticleButtons>
              </Article>
            ) : (
              <p key={pub.id}>Training ID no disponible</p>
            )
          ))
        ) : (
          <p>No public publications available</p>
        )}
        <MoreButton>More</MoreButton>
      </Container>
    </div>
  );
};


const Container = styled.div`
  grid-area: main;
  width: 75%;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
`;

const Article = styled(Link)`  /* Cambiado de CommonCard a Link */
  display: block;
  text-decoration: none;
  color: inherit;  /* Mantener el color del texto por defecto */
  padding: 0;
  margin: 18px 0 18px;
  overflow: visible;
  background-color: #E5E8E8;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  button {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    img {
      width: 48px;
      height: 48px;
      border: 2px solid #000;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      justify-content: column;
      h3 {
        text-align: left;
        font-size: 18px;
        font-weight: 800;
        color: #000;
        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 16px;
          height: 16px;
          border: none;
          margin-right: 2px;
        }
        span {
          margin-left: 0px;
          margin-right: 15px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
          align-items: center;
        }
      }
    }
  }
`;

const MessageBox = styled.div`
  font-family: Arial;
  font-size: 16px;
  display: flex;
  padding: 10px;
  margin-left: 8px;
  text-align: left;
  color: rgba(0, 0, 0, 0.5);
`;

const ActionsPub = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.5);
  align-items: center;
  margin-right: 10px;
  padding: 0px 8px 16px 16px;
  img {
    border: none;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  div {
    display: flex;
    span {
      margin-right: 8px;
    }
  }
`;

const MoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #0073b1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005582;
  }
`;

const ArticleButtons = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  button {
    text-align: center;
    padding: 5px 36px;
    background-color: #FF9966;
    margin-bottom: 16px;
    border: none;
    border-radius: 20px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }

    img {
      border: none;
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`;

export default Publications;
