import { Disclosure, Transition } from '@headlessui/react';
import FriendlyCertificationLabels from '../certification/cards/FriendlyCertificationLabels';

const CertificationsList = (props: any) => {
  if (props?.opportunity?.certifications) {
    return (
      <Disclosure key={props?.indexKey}>
        {({ open }) => (
          <div className='handle-certifications-and-group lg:px-3 xl:px-0'>
            {!open && (
              <Disclosure.Button>
                {' '}
                <div className='handle-certifications-and-group lg:px-3 xl:px-0 relative'>
                  <FriendlyCertificationLabels
                    certifications={props?.opportunity?.certifications}
                    showNumOfOpps={
                      props?.opportunity?.certifications &&
                      props?.opportunity?.certifications?.length >= 3 &&
                      3
                    }
                    setExpandCertifications={props?.setExpandCertifications}
                  />
                </div>
              </Disclosure.Button>
            )}
            {open &&
              props?.opportunity?.certifications &&
              props?.opportunity?.certifications?.length < 3 && (
                <FriendlyCertificationLabels
                  certifications={
                    props?.opportunity?.certifications &&
                    props?.opportunity?.certifications
                  }
                />
              )}

            {open &&
              props?.opportunity?.certifications &&
              props?.opportunity?.certifications?.length >= 3 && (
                <div>
                  <Transition
                    enter='transition duration-100 ease-out'
                    enterFrom='transform scale-95 opacity-0'
                    enterTo='transform scale-100 opacity-100'
                    leave='transition duration-75 ease-out'
                    leaveFrom='transform scale-100 opacity-100'
                    leaveTo='transform scale-95 opacity-0'
                  >
                    <Disclosure.Panel>
                      <FriendlyCertificationLabels
                        certifications={
                          props?.opportunity?.certifications &&
                          props?.opportunity?.certifications
                        }
                      />
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
          </div>
        )}
      </Disclosure>
    );
  } else {
    return (
      <div className='handle-certifications-and-group lg:px-3 xl:px-0'>
        <FriendlyCertificationLabels
          certifications={props?.opportunity?.certifications}
        />
      </div>
    );
  }
};

export default CertificationsList;
