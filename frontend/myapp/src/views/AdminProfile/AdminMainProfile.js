import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { sendAuthenticatedRequest } from '../../services/auth';
import moment from 'moment';

const AdminMainProfile = () => {
  const [publications, setPublications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const { userId } = useParams(); // Obtener el userId de los parámetros de la URL

  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const response = await sendAuthenticatedRequest(
          `http://localhost:8000/api/publication/admin/users/${userId}/publications/`, 
          'GET'
        );
        setPublications(response);
      } catch (error) {
        console.error('Error fetching user publications:', error);
      }
    };

    fetchUserPublications();
  }, [userId]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  return (
    <Container>
      {publications && Array.isArray(publications) && publications.length > 0 ? (
        publications.slice(0, visibleCount).map(pub => (
          pub.training_id ? (
            <ArticleContainer key={pub.id}>
              <Article to={`/sesion/${pub.training_id}`} as={Link}>
                <SharedActor>
                  <button>
                    <img src={pub.profile_picture ? pub.profile_picture : "/imagenes/clock.jpg"} alt="Profile" />
                    <div>
                      <h3>
                        {pub.user_name || 'Unknown User'}
                        <br />
                        <div>
                          <img src="/imagenes/clock.png" alt="Clock" />
                          <span>{moment(pub.created_at).fromNow()}</span>
                          <img src={pub.is_public ? "/imagenes/language.png" : "/imagenes/unlock.png"} alt={pub.is_public ? "Public" : "Private"} />
                          <span>{pub.is_public ? "Public" : "Just me"}</span>
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
                      <b>0</b> likes
                    </span>
                  </div>
                </ActionsPub>
                <ArticleButtons>
                  <button>
                    <img src="/imagenes/like.png" alt="Like" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/imagenes/comente.png" alt="Comment" />
                    <span>Comment</span>
                  </button>
                  <div>
                    <span>0 comments</span>
                  </div>
                </ArticleButtons>
              </Article>
            </ArticleContainer>
          ) : (
            <p key={pub.id}>Training ID no disponible</p>
          )
        ))
      ) : (
        <p>No publications available</p>
      )}

      {visibleCount < publications.length && (
        <MoreButton onClick={handleShowMore}>More</MoreButton>
      )}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  grid-area: main;
  background-color: #FFFFFF;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  min-height: calc(100vh - 150px);
`;

const ArticleContainer = styled.div`
  margin: 0 0 18px 0;
  padding: 16px;
  background-color: #F5F5F5;
  border-radius: 5px;
  border: 1px solid #FF6633;
`;

const Article = styled.div`
  padding: 0;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  a:hover {
    color: #FF6633;
  }
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

  a {
    text-decoration: none !important;
    color: #333;
  }

  a:hover {
    color: #FF6633;
    text-decoration: none !important;
  }
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

const ArticleButtons = styled.div`
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  button {
    text-align: center;
    padding: 5px 36px;
    margin-bottom: 16px;
    background-color: #FF9966;
    border: none;
    border-radius: 20px;
    &:hover {
      background-color: #005582;
    }

    img {
      border: none;
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }
  }
`;

const MoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #FF6633;
  color: white;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 999;
  &:hover {
    background-color: #005582;
    color: white;
  }
`;

export default AdminMainProfile;
