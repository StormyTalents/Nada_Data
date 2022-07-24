import { useEffect } from 'react';
import { useCreateUserLikedOpportunities } from '../../hooks/users/useCreateUserLikedOpportunities';
import { useDeleteUserLikedOpportunities } from '../../hooks/users/useDeleteUserLikedOpportunities';
import { User } from '../../interfaces/User';
import Lottie from 'lottie-react';
import lottieSuccessIcon from '../../common/icon/lottie-success.json';
import { PlusIcon } from '@heroicons/react/solid';

export const FavoriteOpportunity: React.FC<{
  user?: User;
  opportunityId: number;
  onUpdate: () => void;
  detailView?: boolean;
}> = ({ user, opportunityId, onUpdate, detailView = false }) => {
  const {
    createUserLikedOpportunities,
    createdUserLikedOpportunities,
    isCreatingUserLikedOpportunities,
  } = useCreateUserLikedOpportunities(opportunityId);

  const {
    deleteUserLikedOpportunities,
    deletedUserLikedOpportunities,
    isDeletingUserLikedOpportunities,
  } = useDeleteUserLikedOpportunities(opportunityId);

  useEffect(() => {
    if (createdUserLikedOpportunities || deletedUserLikedOpportunities) {
      onUpdate();
    }
  }, [createdUserLikedOpportunities, deletedUserLikedOpportunities]);

  return (
    <>
      {!user ? (
        <button
          className='bg-transparent text-red-500 hover:text-red-300 hover:font-bold py-2 px-0 lg:px-4 rounded:lg inline-flex items-center'
          onClick={() => {
            alert('Please login to use this feature');
          }}
        >
          <img
            className='h-6 w-6'
            src={'/assets/images/icons/shape_icon_new.svg'}
            alt='Workflow'
          />
          {/* <span className="ml-2">Favorite</span> */}
        </button>
      ) : (
        <>
          {!user?.likedOpportunities?.some(
            (item) => item.id === opportunityId
          ) && (
            <button
              className={
                detailView
                  ? 'flex justify-between items-center bg-black border hover:border-black  rounded-md py-2 px-4 xl:ml-2 lg:ml-0 xl:mt-0 lg:mt-2 md:mt-2 mt-2 w-30'
                  : 'bg-transparent text-red-500 hover:text-red-300 hover:font-bold py-2 px-0 lg:px-4 rounded:lg inline-flex items-center'
              }
              onClick={() => {
                createUserLikedOpportunities();
              }}
            >
              {detailView ? (
                <div className='flex justify-center items-center text-white'>
                  {' '}
                  <PlusIcon className='w-5 h-5 text-white mr-2' />{' '}
                  <span>Save</span>
                </div>
              ) : (
                <img
                  className='h-6 w-6 hover:opacity-50'
                  src={'/assets/images/icons/shape_icon_new_2.svg'}
                  alt='Workflow'
                />
              )}
            </button>
          )}
          {user?.likedOpportunities?.some(
            (item) => item.id === opportunityId
          ) && (
            <button
              className={
                detailView
                  ? 'flex justify-between items-center bg-black border hover:border-black  rounded-md py-2 px-4 xl:ml-2 lg:ml-0 xl:mt-0 lg:mt-2 md:mt-2 mt-2 w-30'
                  : 'text-red-700 bg-transparent hover:text-red-300 font-bold text-lg py-2 px-0 lg:px-4 rounded inline-flex flex-nowrap'
              }
              onClick={() => {
                deleteUserLikedOpportunities();
              }}
            >
              {detailView ? (
                <div className='flex justify-center items-center text-white'>
                  <Lottie
                    animationData={lottieSuccessIcon}
                    loop={false}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <span className='ml-2'>Saved</span>
                </div>
              ) : (
                <img
                  className='h-6 w-6 hover:opacity-50'
                  src={'/assets/images/icons/shape_icon_new.svg'}
                  alt='Workflow'
                />
              )}
              {/* <span className="ml-2">Un&#45;Favorite</span> */}
            </button>
          )}

          <button className='hidden bg-white ml-2 hover:bg-gray-700 text-gray-500 hover:text-white border border-gray-500 font-bold py-2 px-0 lg:px-4 rounded inline-flex items-center mt-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
              />
            </svg>
          </button>
        </>
      )}
    </>
  );
};
