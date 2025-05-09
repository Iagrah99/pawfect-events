import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalking,
  faStopwatch,
  faStar,
  faTrophy,
  faDumbbell,
  faPaw,
  faCheckCircle,
  faUsersBetweenLines,
  faSearchLocation,
  faUsers,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "../../utils/api";

const features = [
  {
    title: "Discover Events",
    description: "Find dog events that match your interests in your area.",
    icon: faSearchLocation,
  },
  {
    title: "Connect",
    description: "Meet other dog lovers and build lasting friendships.",
    icon: faUsers,
  },
  {
    title: "Organise",
    description: "Host and manage your own events with ease.",
    icon: faCalendarAlt,
  },
];

const Home = () => {
  const { loggedInUser } = useContext(UserContext);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const fetchedCategoryData = await getCategories();
      setCategories(fetchedCategoryData);
      setIsLoading(false);
    };

    fetchCategoryData();
  }, []);

  const categoryIconMap = {
    "Dog-Training": faDumbbell,
    "Dog-Walking": faPersonWalking,
    "Agility-Trials": faStopwatch,
    "Dog-Shows": faStar,
    "Dog-Competitions": faTrophy,
    "Herding-Trials": faPaw,
    "Obedience-Trials": faCheckCircle,
    "Breed-Meetups": faUsersBetweenLines,
  };

  const CategorySkeleton = () => {
    return (
      <div className="w-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-slate-800 rounded-full animate-pulse border-1 border-slate-700 mx-auto" />
    );
  };

  const FeatureSkeleton = () => (
    <div className="bg-slate-800 rounded-xl p-6 animate-pulse border border-slate-700">
      <div className="h-10 w-10 mx-auto mb-4 bg-slate-700 rounded-full"></div>
      <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-3 bg-slate-700 rounded w-5/6 mx-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col text-gray-900 font-sans bg-slate-900">
      <NavigationBar />

      <main className="flex-grow bg-slate-900 container">
        {/* Hero Section */}
        <section className="bg-slate-900 text-center mt-3 md:mt-5">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl min-h-fit px-4 py-16 sm:py-20">
            {/* Background Image */}
            <img
              src="https://res.cloudinary.com/dafsdsmus/image/upload/v1746732902/pexels-helenalopes-1959054_np0fge.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none select-none"
            />
            <div className="absolute inset-0 z-10" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-2xl text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Discover Experiences That Get Tails Wagging
              </h1>
              <p className="text-base sm:text-lg text-white mt-4">
                Explore local dog events, connect with like-minded people, and
                create memories that last a lifetime.
              </p>
            </div>
          </div>

          {/* Buttons - below the image */}
          <div className="mt-4 pb-10">
            <div className="space-x-2 md:space-x-4">
              <a
                href="/events"
                className="inline-block px-6 py-3 border-1 mb-2 md:mb-0 border-slate-800 md:hover:border-gray-400 text-white text-sm md:text-base font-semibold no-underline rounded-full transition duration-200"
              >
                Explore Events
              </a>
              {loggedInUser && (
                <a
                  href="/create-event"
                  className="inline-block px-6 py-3 border-1 mt-2 md:mt-0 border-slate-800 md:hover:border-gray-400 text-white text-sm md:text-base font-semibold no-underline rounded-full transition duration-200"
                >
                  Create Event
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Category Icons */}
        <section className="py-16 bg-slate-900 text-white px-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : categories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-slate-900 text-sm sm:text-xs md:text-lg shadow-md md:hover:shadow-lg border-1 border-slate-800 transition-all md:hover:bg-slate-800 md:hover:border-slate-700 md:hover:scale-105 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={categoryIconMap[category.slug] || faStar}
                    className="text-2xl mb-2 text-orange-700"
                  />
                  <p className="text-sm sm:text-xs text-slate-200">
                    {category.slug.replace(/-/g, " ")}
                  </p>
                </div>
              ))}
        </section>

        {/* Feature Cards */}
        <section className="py-16 bg-slate-900 px-6">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <FeatureSkeleton key={index} />
                ))
              : features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-xl shadow p-6 text-center border-1 border-slate-800"
                  >
                    <div className="text-3xl mb-4">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="text-orange-700 shadow"
                      />
                    </div>
                    <h3 className="text-white text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white text-sm">{feature.description}</p>
                  </div>
                ))}
          </div>
        </section>
      </main>

      <Footer page="home" />
    </div>
  );
};

export default Home;
