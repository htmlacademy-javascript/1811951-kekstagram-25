import { DATA } from './data.js';
import { getRandInt } from './utils.js';

const FIRST_AVATAR_NUMBER = 1;
const LAST_AVATAR_NUMBER = 6;

const getComments = () => {
  const commentsList = [...DATA.comments];
  const commentsTotal = getRandInt(1, DATA.comments.length);
  const commentsPost = [];
  while (commentsPost.length < commentsTotal) {
    const getRandomComment = getRandInt(0, commentsList.length - 1);
    commentsPost.push({
      id: commentsPost.length,
      name: DATA.names[commentsPost.length],
      avatar: `img/avatar-${getRandInt(FIRST_AVATAR_NUMBER, LAST_AVATAR_NUMBER)}.svg`,
      comment: commentsList[getRandomComment],
    });
    commentsList.splice(getRandomComment, 1);
  }
  return commentsPost;
};

const createPosts = () => {
  const posts = [];
  for (let i = 1; i <= DATA.postAmount; i++) {
    const post = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DATA.descriptions[i],
      likes: getRandInt(DATA.likes.min, DATA.likes.max),
      comments: getComments(),
    };
    posts.push(post);
  }
  return posts;
};

const postList = createPosts();

export { postList };
