import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BarraNavegacionAdmin } from '../components/BarraNavegacionAdmin';
import { getAllPublications, deletePublication } from '../services/admin';
import moment from 'moment';

const AdminPublications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getAllPublications()
      .then(data => {
        setPublications(data);
      })
      .catch(error => {
        console.error('Error fetching all publications:', error);
      });
  }, []);

  const handleDelete = async (publicationId) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) {
      return;
    }
    try {
      await deletePublication(publicationId);
      setPublications(prevPublications =>
        prevPublications.filter(pub => pub.id !== publicationId)
      );
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  return (
    <div>
      <BarraNavegacionAdmin />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        {publications && Array.isArray(publications) && publications.length > 0 ? (
          publications.map(pub => (
            pub.training_id ? (
              <Article key={pub.id}>
                <SharedActor>
                  <button>
                    <img src={pub.profile_picture ? pub.profile_picture : "/imagenes/fotocv.jpg"} alt="Profile" />
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
                <ArticleButtons>
                  <button onClick={() => handleDelete(pub.id)}>
                    <img src="/imagenes/delete.png" alt="Delete" />
                    <span>Delete</span>
                  </button>
                  <button>
                    <img src="/imagenes/like.png" alt="Like" />
                    <span>{pub.likes_count} Likes</span>
                  </button>
                  <button>
                    <img src="/imagenes/comente.png" alt="Comment" />
                    <span>Comment</span>
                  </button>
                </ArticleButtons>
              </Article>
            ) : (
              <p key={pub.id}>Training ID not available</p>
            )
          ))
        ) : (
          <p>No publications available</p>
        )}
      </Container>
    </div>
  );
};

// Styled components
const Container = styled.div`
  grid-area: main;
  width: 75%;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 20px;
`;

const Article = styled.div`
  padding: 0;
  margin: 18px 0 18px;
  overflow: visible;
  background-color: #E5E8E8;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 16px;
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

export default AdminPublications;
