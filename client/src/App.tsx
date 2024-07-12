import "./App.css";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AdminIndex } from "./components/admin";
import { EventListInAdmin } from "./components/admin/EventList";
import { EventServiceList } from "./components/admin/EventServiceList";
import { GroupListInAdmin } from "./components/admin/GroupList";
import { GroupPostCommentListInAdmin } from "./components/admin/GroupPostCommentList";
import { GroupPostListInAdmin } from "./components/admin/GroupPostList";
import { UserListInAdmin } from "./components/admin/ListInAdmin";
import { ShortVideoListInAdmin } from "./components/admin/shortVidsList";
import { StoriesListInAdmin } from "./components/admin/StoriesListInAdmin";
import { VenueListInAdmin } from "./components/admin/VenueList";
import { ViewByAdminEventCategory } from "./components/event/viewByAdminEventCat";
import { EServiceCategoryFullList } from "./components/eventServices/getCatByService";
import { ViewByEServiceCat } from "./components/eventServices/viewByEServiceCat";
import { ChangePasswordLoggedOut } from "./components/logIn/changePasswordLoggedOut";
import { EnterOTP } from "./components/logIn/enterOTP";
import { ForgotPassword } from "./components/logIn/forgotPassword";
import Root from "./components/root/root";
import { DynamicVenue } from "./components/venue/dynamicVenue";
import { ShowAdminEventsCategoriesFullList } from "./components/venue/showCatByEvenueFullList";
import { ShowLocationsFullList } from "./components/venue/showLocationsFullList";
import { ViewByCategoryV } from "./components/venue/viewByCategory";
import { ViewByLocation } from "./components/venue/viewByLocation";
import About from "./pages/about";
import Blacklist from "./pages/blacklist";
import { CreateAnEvent } from "./pages/createAnEvent";
import { CreateGroup } from "./pages/createGroup";
import { CreateService } from "./pages/createService";
import { DyanmicGroups } from "./pages/dyanmicGroups";
import { DynamicChatWrapper } from "./pages/dynamicChatWrapper";
import { DynamicServiceProvides } from "./pages/dynamicEservice";
import { DynamicEvent } from "./pages/dynamicEvent";
import { DynamicReviews } from "./pages/dynamicReviews";
import { DynamicShortVideos } from "./pages/dynamicShortVids";
import { DynamicStories } from "./pages/dynamicStories";
import EventServices from "./pages/eventServices";
import EventShowcase from "./pages/eventShowcase";
import { Groups } from "./pages/groups";
import Home from "./pages/home";
import Login from "./pages/login";
import { ProfileMessages } from "./pages/messages";
import { MyListings } from "./pages/myListings";
import { Profile } from "./pages/profile";
import { ProfileMedia } from "./pages/profileMedia";
import { ProfilePost } from "./pages/profilePost";
import { ShortVideos } from "./pages/shortVideos";
import { ShortVideoUploadForm } from "./pages/shortVideoUpload";
import SignUp from "./pages/signUp";
import Ticketing from "./pages/ticketing";
import Venues from "./pages/venues";
import { HomeAdvert } from "./components/admin/HomeAdvert";
import { DeleteHomeAdvert } from "./components/admin/DeleteHomeAd";

function App() {
  const [tokenState, setTokenState] = useState(
    Cookies.get("token") ? true : false
  );

  useEffect(() => {
    setTokenState(Cookies.get("token") ? true : false);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Root setTokenState={setTokenState} tokenState={tokenState} />}
      >
        <Route index element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/event-services" element={<EventServices />} />
        <Route path="/event-showcase" element={<EventShowcase />} />
        <Route path="/about" element={<About />} />
        <Route path="/blacklist" element={<Blacklist />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login setTokenState={setTokenState} />}
        />
        {/*others*/}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        <Route path="/events/:event_id" element={<DynamicEvent />} />
        <Route path="/venues/:venue_id" element={<DynamicVenue />} />
        <Route path="/create-event" element={<CreateAnEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/my-listings" element={<MyListings />} />
        <Route path="/profile/post" element={<ProfilePost />} />
        <Route path="/profile/media" element={<ProfileMedia />} />
        <Route path="/profile/messages" element={<ProfileMessages />} />
        <Route path="/short-videos" element={<ShortVideos />} />
        <Route
          path="/short-videos/:video_id"
          element={<DynamicShortVideos />}
        />
        <Route path="/upload-short-videos" element={<ShortVideoUploadForm />} />
        <Route path="/stories/:story_id" element={<DynamicStories />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/:group_id" element={<DyanmicGroups />} />
        <Route
          path="/event-services/:eservice_id"
          element={<DynamicServiceProvides />}
        />
        <Route
          path="/chat/:recipient_id/:first_name"
          element={<DynamicChatWrapper />}
        />
        <Route path="/e-service/create-service" element={<CreateService />} />
        {/* <Route
          path="/events/q/:category_view"
          element={<ViewByCategory />}
        /> */}
        <Route
          path="/venues/q/:location_identifier"
          element={<ViewByLocation />}
        />
        <Route
          path="/venues/ci/:category_identifier"
          element={<ViewByCategoryV />}
        />
        <Route
          path="/event/ev/:category_identifier"
          element={<ViewByAdminEventCategory />}
        />
        <Route
          path="/event-services/q/:category_identifier"
          element={<ViewByEServiceCat />}
        />
        {/* Full list of oga's designs */}
        <Route
          path="/event-centres/full-list"
          element={<ShowLocationsFullList />}
        />
        <Route
          path="/by-eVenue/full-list"
          element={<ShowAdminEventsCategoriesFullList />}
        />
        <Route
          path="/event-services/full-list"
          element={<EServiceCategoryFullList />}
        />
        <Route
          path="/reviews/:service_id/:business_name"
          element={<DynamicReviews />}
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route
          path="/changed-pw-logged-out"
          element={<ChangePasswordLoggedOut />}
        />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/event-list" element={<EventListInAdmin />} />
        <Route path="/admin/venue-list" element={<VenueListInAdmin />} />
        <Route path="/admin/event-services" element={<EventServiceList />} />
        <Route path="/admin/user-list" element={<UserListInAdmin />} />
        <Route path="/admin/short-videos" element={<ShortVideoListInAdmin />} />
        <Route path="/admin/stories" element={<StoriesListInAdmin />} />
        <Route path="/admin/group-list" element={<GroupListInAdmin />} />
        <Route
          path="/admin/group-post-list"
          element={<GroupPostListInAdmin />}
        />
        <Route
          path="/admin/group-post-comment-list"
          element={<GroupPostCommentListInAdmin />}
        />
        <Route
          path="/admin/event-service-list"
          element={<GroupPostCommentListInAdmin />}
        />
        <Route path="/admin/home-advert" element={<HomeAdvert />} />
        <Route
          path="/admin/delete-home-advert"
          element={<DeleteHomeAdvert />}
        />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
