import { CommentItem } from 'src/components/comments/CommentItem';
import { screen, fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from 'src/utils/test-utils';
import { Alert } from 'react-native';

const commentData = {
  postId: 1,
  id: 1,
  name: 'Random comment',
  email: 'random@gmail.com',
  body: 'Random content',
};

describe('<CommentItem /> component', () => {
  const alert = jest.spyOn(Alert, 'alert');

  it('should render null without props data', () => {
    renderWithProviders(<CommentItem />);

    expect(screen.queryByTestId('comment-item')).toBeNull();
  });

  it('should render random comment', () => {
    renderWithProviders(<CommentItem data={commentData} />);

    expect(screen.queryByTestId('comment-item')).toBeTruthy();
    expect(screen.getByText('Random comment')).toBeTruthy();
    expect(screen.getByText('random@gmail.com')).toBeTruthy();
    expect(screen.getByText('Random content')).toBeTruthy();
  });

  it('should able to open alert after long press', async () => {
    renderWithProviders(<CommentItem data={commentData} />, {
      preloadedState: {
        auth: {
          user: {
            id: 1,
            email: 'random@gmail.com',
          },
        },
      },
    });

    expect(screen.queryByTestId('comment-item')).toBeTruthy();
    fireEvent(screen.getByTestId('comment-item'), 'onLongPress');
    expect(Alert.alert).toHaveBeenCalled();
    expect(alert.mock.calls[0][0]).toEqual('Delete comment');
    expect(alert.mock.calls[0][1]).toEqual('Are you sure?');
  });
});
