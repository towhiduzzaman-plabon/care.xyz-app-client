import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Care.xyz | Trusted Care Services</title>
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Trusted Care for Your Family
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Baby Care • Elderly Care • Sick Patient Care
          </p>

          <Link
            to="/services"
            className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-300"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Care Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Baby Care</h3>
              <p className="text-gray-600 mb-4">
                Professional babysitters ensuring safety and love.
              </p>
              <Link to="/services" className="text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Elderly Care</h3>
              <p className="text-gray-600 mb-4">
                Trusted caregivers for senior family members.
              </p>
              <Link to="/services" className="text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Sick Patient Care</h3>
              <p className="text-gray-600 mb-4">
                Home care for patients with medical attention.
              </p>
              <Link to="/services" className="text-blue-600 font-medium">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Care.xyz?</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div>
              <h4 className="font-semibold text-lg mb-2">Verified Caregivers</h4>
              <p className="text-gray-600">
                Background-checked and trained professionals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Secure Booking</h4>
              <p className="text-gray-600">
                Safe payment & booking system.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">24/7 Support</h4>
              <p className="text-gray-600">
                We’re always here for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
};

export default Home;
