import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { getCategories } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Search,
  Users,
  Dumbbell,
  Timer,
  Star,
  Trophy,
  PawPrint,
  Dog,
  Footprints,
} from "lucide-react";

const features = [
  {
    title: "Discover",
    description: "Find dog events that match your interests in your area.",
    icon: Search,
    backgroundColor: "blue",
  },
  {
    title: "Connect",
    description: "Meet other dog lovers and build lasting friendships.",
    icon: Users,
    backgroundColor: "green",
  },
  {
    title: "Organise",
    description: "Host and manage your own dog events with ease.",
    icon: Calendar,
    backgroundColor: "purple",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-500/5",
    text: "text-blue-500",
  },
  green: {
    bg: "bg-green-500/5",
    text: "text-green-500",
  },
  purple: {
    bg: "bg-purple-500/5",
    text: "text-purple-500",
  },
};

const Home = () => {
  const navigate = useNavigate();
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

  const handleCategoryChoice = (cat) => {
    console.log(cat.slug);
    navigate(`/events?category=${cat.slug}`);
  };

  const categoryIconMap = {
    "Dog-Training": Dumbbell,
    "Dog-Walking": Footprints,
    "Agility-Trial": Timer,
    "Dog-Show": Star,
    "Dog-Competition": Trophy,
    "Herding-Trial": PawPrint,
    "Obedience-Trial": Dog,
    "Breed-Meetup": Users,
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
    <div className="min-h-dvh flex flex-col text-gray-900 font-sans bg-slate-900">
      <NavigationBar />

      <main className="flex-grow bg-slate-900 px-4 sm:px-6 xl:px-0 xl:container xl:mx-auto">
        {/* Hero Section */}
        <section className="text-center mt-6 md:mt-10">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl px-4 py-16 sm:py-20">
            {/* Background Image */}
            <img
              src="https://res.cloudinary.com/dafsdsmus/image/upload/v1746732902/pexels-helenalopes-1959054_np0fge.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none select-none"
            />
            <div className="absolute inset-0 z-10" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-2xl text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl">
                Discover Experiences That Get Tails Wagging
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white mt-4 max-w-xl">
                Explore local dog events, connect with like-minded people, and
                create memories that last a lifetime.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 pb-10 flex flex-wrap gap-3 justify-center">
            <a
              href="/events"
              className="px-6 py-3 border-1 border-slate-800 lg:hover:border-gray-400 text-white text-sm md:text-base font-semibold no-underline rounded-full transition duration-200"
            >
              Explore Events
            </a>
            {loggedInUser && (
              <a
                href="/create-event"
                className="px-6 py-3 border-1 border-slate-800 lg:hover:border-gray-400 text-white text-sm md:text-base font-semibold no-underline rounded-full transition duration-200"
              >
                Create Event
              </a>
            )}
          </div>
        </section>

        {/* Category Icons */}
        <section className="py-16 text-white max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 text-center">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))
            : categories.map((category, index) => {
                const Icon = categoryIconMap[category.slug] || Star;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-full w-24 h-24 sm:h-28 md:w-36 md:h-36 rounded-full bg-slate-900 shadow-md lg:hover:shadow-lg border-1 border-slate-800 lg:hover:bg-slate-800 lg:hover:border-slate-700 transition-all lg:hover:scale-105 cursor-pointer"
                    onClick={() => handleCategoryChoice(category)}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 mb-2 text-orange-500" />
                    <p className="text-xs md:text-sm text-slate-200">
                      {(() => {
                        const label = category.slug.replace(/-/g, " ");
                        return label.endsWith("g") ? label : `${label}s`;
                      })()}
                    </p>
                  </div>
                );
              })}
        </section>

        {/* Feature Cards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto grid gap-10 sm:gap-12 md:grid-cols-3 px-4 sm:px-0">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <FeatureSkeleton key={index} />
                ))
              : features.map((feature, index) => {
                  const Icon = feature.icon;
                  console.log(feature.icon); // Should log the icon component function
                  return (
                    <div
                      key={index}
                      className="bg-slate-900 rounded-xl shadow p-6 border-1 border-slate-800"
                    >
                      <div
                        className={`p-3 mb-3 rounded-full ${
                          colorClasses[feature.backgroundColor].bg
                        } backdrop-blur-sm shadow-sm w-fit`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            colorClasses[feature.backgroundColor].text
                          }`}
                        />
                      </div>

                      <h3 className="text-white text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
          </div>
        </section>
      </main>

      <Footer page="home" />
    </div>
  );
};

export default Home;
