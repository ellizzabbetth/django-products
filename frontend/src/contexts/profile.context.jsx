import React, {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext
  } from "react";



const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileVersion, setProfileVersion] = useState(0);
  const context = useMemo(
    () => ({
      profileVersion,
      refreshProfile: () =>
        // Increment the version which will update the state
        setProfileVersion((currentVersion) => currentVersion + 1)
    }),
    [profileVersion]
  );

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

// React useContext, useCallback
// https://marmelab.com/blog/2020/12/14/react-admin-v3-userprofile.html