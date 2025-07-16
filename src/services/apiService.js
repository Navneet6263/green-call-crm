// API Service with MongoDB Backend
const API_BASE_URL = 'http://localhost:5000/api';
const DUMMY_API = 'https://dummyjson.com'; // Fallback for posts

class ApiService {
  // Posts API - Using DummyJSON
  async getPosts() {
    const response = await fetch(`${DUMMY_API}/posts?limit=50`);
    return await response.json();
  }

  async getPostById(id) {
    const response = await fetch(`${DUMMY_API}/posts/${id}`);
    return await response.json();
  }

  async createPost(postData) {
    // Mock post creation
    return {
      id: Date.now(),
      ...postData,
      userId: 1,
      createdAt: new Date().toISOString()
    };
  }

  // CRM APIs - MongoDB Backend
  async getLeads() {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`);
      if (!response.ok) throw new Error('Failed to fetch leads');
      return await response.json();
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Fallback to basic mock data if backend is down
      return [
        {
          _id: '1',
          companyName: 'Tech Solutions Ltd',
          contactPerson: 'John Smith',
          email: 'john@techsolutions.com',
          phone: '+91-9876543210',
          status: 'new',
          estimatedValue: 500000,
          createdDate: new Date().toISOString()
        }
      ];
    }
  }

  async createLead(leadData) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (!response.ok) throw new Error('Failed to create lead');
      return await response.json();
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  async getCustomers() {
    try {
      const response = await fetch(`${API_BASE_URL}/customers`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  }

  async getEnquiries() {
    try {
      const response = await fetch(`${DUMMY_API}/posts?limit=10`);
      const data = await response.json();
      
      // Transform posts to enquiries
      return data.posts.map(post => ({
        id: post.id,
        title: post.title,
        description: post.body,
        leadId: Math.floor(Math.random() * 20) + 1,
        status: ['pending', 'in-progress', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        createdDate: new Date().toISOString(),
        assignedTo: 'Support Team'
      }));
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      return [];
    }
  }

  // Update lead
  async updateLead(id, leadData) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      if (!response.ok) throw new Error('Failed to update lead');
      return await response.json();
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  // Delete lead
  async deleteLead(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete lead');
      return await response.json();
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }

  // Get dashboard analytics
  async getDashboardAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        totalLeads: 0,
        totalCustomers: 0,
        totalValue: 0,
        leadsByStatus: [],
        recentLeads: []
      };
    }
  }

  // All leads (same as getLeads for MongoDB)
  async getAllLeads() {
    return await this.getLeads();
  }



  // Birds API - Custom 30 Birds with Images and Information
  async getBirds() {
    return [
      {
        id: 1,
        name: 'Peacock',
        scientificName: 'Pavo cristatus',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'Forests, grasslands',
        diet: 'Omnivore - seeds, insects, small reptiles',
        size: '100-115 cm',
        weight: '4-6 kg',
        lifespan: '15-20 years',
        status: 'Least Concern',
        facts: 'National bird of India. Males have colorful tail feathers with eye-spots.',
        sound: 'Loud calls, especially during monsoon',
        breeding: 'Monsoon season, 4-8 eggs'
      },
      {
        id: 2,
        name: 'Eagle',
        scientificName: 'Aquila chrysaetos',
        image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400',
        habitat: 'Mountains, forests, open areas',
        diet: 'Carnivore - small mammals, fish, birds',
        size: '75-85 cm',
        weight: '3-6 kg',
        lifespan: '20-30 years',
        status: 'Least Concern',
        facts: 'Excellent eyesight, can spot prey from 2 miles away.',
        sound: 'High-pitched screech',
        breeding: 'Spring, 1-3 eggs in cliff nests'
      },
      {
        id: 3,
        name: 'Parrot',
        scientificName: 'Psittacus erithacus',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
        habitat: 'Tropical forests, urban areas',
        diet: 'Herbivore - fruits, nuts, seeds',
        size: '25-35 cm',
        weight: '400-650g',
        lifespan: '50-80 years',
        status: 'Endangered',
        facts: 'Highly intelligent, can mimic human speech and solve puzzles.',
        sound: 'Squawks, can mimic sounds',
        breeding: 'Year-round, 2-4 eggs in tree holes'
      },
      {
        id: 4,
        name: 'Owl',
        scientificName: 'Bubo bubo',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'Forests, grasslands, urban areas',
        diet: 'Carnivore - rodents, small mammals, insects',
        size: '35-75 cm',
        weight: '500g-4kg',
        lifespan: '10-25 years',
        status: 'Least Concern',
        facts: 'Nocturnal hunter with silent flight and excellent night vision.',
        sound: 'Hooting, screeching',
        breeding: 'Spring, 2-5 eggs in tree cavities'
      },
      {
        id: 5,
        name: 'Sparrow',
        scientificName: 'Passer domesticus',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Urban areas, farmlands',
        diet: 'Omnivore - seeds, insects, scraps',
        size: '14-16 cm',
        weight: '24-39g',
        lifespan: '4-7 years',
        status: 'Least Concern',
        facts: 'One of the most common birds, highly adaptable to human environments.',
        sound: 'Chirping, chattering',
        breeding: 'Multiple broods per year, 3-5 eggs'
      },
      {
        id: 6,
        name: 'Crow',
        scientificName: 'Corvus brachyrhynchos',
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400',
        habitat: 'Urban areas, forests, farmlands',
        diet: 'Omnivore - insects, small animals, carrion, fruits',
        size: '40-50 cm',
        weight: '300-600g',
        lifespan: '7-8 years',
        status: 'Least Concern',
        facts: 'Highly intelligent, can use tools and recognize human faces.',
        sound: 'Cawing, various calls',
        breeding: 'Spring, 3-6 eggs in tree nests'
      },
      {
        id: 7,
        name: 'Kingfisher',
        scientificName: 'Alcedo atthis',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'Rivers, lakes, streams',
        diet: 'Carnivore - fish, aquatic insects',
        size: '16-17 cm',
        weight: '34-46g',
        lifespan: '6-10 years',
        status: 'Least Concern',
        facts: 'Expert fisher, dives into water to catch fish with precision.',
        sound: 'Sharp whistle, trilling',
        breeding: 'Spring-summer, 5-7 eggs in riverbank burrows'
      },
      {
        id: 8,
        name: 'Flamingo',
        scientificName: 'Phoenicopterus roseus',
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400',
        habitat: 'Salt lakes, lagoons, mudflats',
        diet: 'Filter feeder - algae, small crustaceans',
        size: '120-145 cm',
        weight: '2-4 kg',
        lifespan: '20-30 years',
        status: 'Least Concern',
        facts: 'Pink color comes from carotenoids in their diet. Often stands on one leg.',
        sound: 'Honking, grunting',
        breeding: 'Rainy season, 1 egg on mud mounds'
      },
      {
        id: 9,
        name: 'Hummingbird',
        scientificName: 'Trochilidae',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'Gardens, forests, meadows',
        diet: 'Nectar, small insects, tree sap',
        size: '7.5-13 cm',
        weight: '2-20g',
        lifespan: '3-5 years',
        status: 'Various',
        facts: 'Smallest bird, can fly backwards and hover. Wings beat 50-80 times per second.',
        sound: 'High-pitched chirps, humming of wings',
        breeding: 'Spring-summer, 2 tiny eggs'
      },
      {
        id: 10,
        name: 'Woodpecker',
        scientificName: 'Picidae',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Forests, woodlands, parks',
        diet: 'Insects, larvae, nuts, fruits',
        size: '15-50 cm',
        weight: '25g-500g',
        lifespan: '4-12 years',
        status: 'Various',
        facts: 'Specialized beak and skull for drilling into wood. Tongue can extend beyond beak.',
        sound: 'Drumming on wood, calls',
        breeding: 'Spring, 2-8 eggs in tree cavities'
      },
      {
        id: 11,
        name: 'Robin',
        scientificName: 'Turdus migratorius',
        image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400',
        habitat: 'Gardens, parks, woodlands',
        diet: 'Worms, insects, fruits, berries',
        size: '20-28 cm',
        weight: '77g',
        lifespan: '2-3 years',
        status: 'Least Concern',
        facts: 'Often seen hopping on lawns hunting for worms. Symbol of spring.',
        sound: 'Melodious song, chirping',
        breeding: 'Spring-summer, 3-5 blue eggs'
      },
      {
        id: 12,
        name: 'Swan',
        scientificName: 'Cygnus olor',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
        habitat: 'Lakes, rivers, wetlands',
        diet: 'Aquatic plants, algae, small fish',
        size: '125-170 cm',
        weight: '10-15 kg',
        lifespan: '20-30 years',
        status: 'Least Concern',
        facts: 'Graceful water birds, mate for life. Powerful wings despite elegant appearance.',
        sound: 'Hissing, trumpeting',
        breeding: 'Spring, 4-8 eggs in large nests'
      },
      {
        id: 13,
        name: 'Penguin',
        scientificName: 'Spheniscidae',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'Antarctic, coastal areas',
        diet: 'Fish, krill, squid',
        size: '40-120 cm',
        weight: '1-40 kg',
        lifespan: '15-25 years',
        status: 'Various',
        facts: 'Flightless birds, excellent swimmers. Huddle together for warmth.',
        sound: 'Trumpeting, braying',
        breeding: 'Winter, 1-2 eggs, shared parenting'
      },
      {
        id: 14,
        name: 'Cardinal',
        scientificName: 'Cardinalis cardinalis',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'Woodlands, gardens, shrublands',
        diet: 'Seeds, grains, fruits, insects',
        size: '21-23 cm',
        weight: '33-65g',
        lifespan: '3-4 years',
        status: 'Least Concern',
        facts: 'Bright red males, brownish females. Non-migratory, stays year-round.',
        sound: 'Clear whistles, birdy-birdy-birdy',
        breeding: 'Spring-summer, 2-5 eggs'
      },
      {
        id: 15,
        name: 'Blue Jay',
        scientificName: 'Cyanocitta cristata',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Forests, parks, residential areas',
        diet: 'Nuts, seeds, insects, eggs',
        size: '28-30 cm',
        weight: '70-100g',
        lifespan: '7-9 years',
        status: 'Least Concern',
        facts: 'Intelligent and social, can mimic other bird calls. Stores thousands of acorns.',
        sound: 'Jay-jay calls, various mimicked sounds',
        breeding: 'Spring, 3-6 eggs in tree nests'
      },
      {
        id: 16,
        name: 'Falcon',
        scientificName: 'Falco peregrinus',
        image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400',
        habitat: 'Cliffs, urban areas, open country',
        diet: 'Birds, small mammals',
        size: '34-58 cm',
        weight: '330g-1.5kg',
        lifespan: '15-20 years',
        status: 'Least Concern',
        facts: 'Fastest bird in the world, diving speeds over 300 km/h.',
        sound: 'Harsh cacking calls',
        breeding: 'Spring, 2-5 eggs on cliff ledges'
      },
      {
        id: 17,
        name: 'Toucan',
        scientificName: 'Ramphastos toco',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
        habitat: 'Tropical rainforests',
        diet: 'Fruits, insects, eggs, small reptiles',
        size: '55-65 cm',
        weight: '500-860g',
        lifespan: '15-20 years',
        status: 'Least Concern',
        facts: 'Large colorful beak is lightweight and helps regulate body temperature.',
        sound: 'Croaking, yelping calls',
        breeding: 'Spring, 2-4 eggs in tree holes'
      },
      {
        id: 18,
        name: 'Pelican',
        scientificName: 'Pelecanus occidentalis',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'Coastal areas, lakes, rivers',
        diet: 'Fish, occasionally amphibians',
        size: '106-137 cm',
        weight: '2.75-5.5 kg',
        lifespan: '15-25 years',
        status: 'Least Concern',
        facts: 'Large throat pouch for catching fish. Excellent gliders over water.',
        sound: 'Grunting, hissing',
        breeding: 'Year-round, 2-4 eggs in colonies'
      },
      {
        id: 19,
        name: 'Ostrich',
        scientificName: 'Struthio camelus',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'African savannas, grasslands',
        diet: 'Plants, seeds, fruits, insects',
        size: '175-280 cm',
        weight: '63-145 kg',
        lifespan: '30-70 years',
        status: 'Least Concern',
        facts: 'Largest living bird, cannot fly but runs up to 70 km/h.',
        sound: 'Booming, hissing',
        breeding: 'Dry season, 10-60 eggs in ground nests'
      },
      {
        id: 20,
        name: 'Canary',
        scientificName: 'Serinus canaria',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Islands, introduced worldwide',
        diet: 'Seeds, fruits, green vegetation',
        size: '12.5 cm',
        weight: '15-20g',
        lifespan: '10-15 years',
        status: 'Least Concern',
        facts: 'Popular pet bird, bred for singing ability and bright yellow color.',
        sound: 'Beautiful melodious songs',
        breeding: 'Spring-summer, 3-5 eggs'
      },
      {
        id: 21,
        name: 'Magpie',
        scientificName: 'Pica pica',
        image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400',
        habitat: 'Open woodlands, farmlands, parks',
        diet: 'Omnivore - insects, small animals, fruits',
        size: '44-46 cm',
        weight: '200-250g',
        lifespan: '3-4 years',
        status: 'Least Concern',
        facts: 'Highly intelligent, can recognize themselves in mirrors. Collects shiny objects.',
        sound: 'Chattering, harsh calls',
        breeding: 'Spring, 5-8 eggs in large stick nests'
      },
      {
        id: 22,
        name: 'Stork',
        scientificName: 'Ciconia ciconia',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
        habitat: 'Wetlands, grasslands, agricultural areas',
        diet: 'Fish, frogs, insects, small mammals',
        size: '100-115 cm',
        weight: '2.3-4.4 kg',
        lifespan: '22-39 years',
        status: 'Least Concern',
        facts: 'Large wading birds, known for delivering babies in folklore. Migrate long distances.',
        sound: 'Bill clattering, hissing',
        breeding: 'Spring, 3-5 eggs in large platform nests'
      },
      {
        id: 23,
        name: 'Kiwi',
        scientificName: 'Apteryx australis',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'New Zealand forests',
        diet: 'Worms, insects, fruits, leaves',
        size: '45-65 cm',
        weight: '1.3-3.3 kg',
        lifespan: '25-50 years',
        status: 'Vulnerable',
        facts: 'Flightless, nocturnal bird with excellent sense of smell. National bird of New Zealand.',
        sound: 'Shrill whistle, grunting',
        breeding: 'Winter-spring, 1-2 large eggs'
      },
      {
        id: 24,
        name: 'Heron',
        scientificName: 'Ardea cinerea',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'Wetlands, rivers, lakes, coasts',
        diet: 'Fish, frogs, small mammals, insects',
        size: '84-102 cm',
        weight: '1-2 kg',
        lifespan: '15-20 years',
        status: 'Least Concern',
        facts: 'Patient hunter, stands motionless waiting for prey. Excellent fishing technique.',
        sound: 'Harsh croaks, squawks',
        breeding: 'Spring, 3-5 eggs in tree colonies'
      },
      {
        id: 25,
        name: 'Pigeon',
        scientificName: 'Columba livia',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Urban areas, cliffs, buildings',
        diet: 'Seeds, fruits, scraps',
        size: '32-37 cm',
        weight: '300-500g',
        lifespan: '3-5 years',
        status: 'Least Concern',
        facts: 'Excellent navigation abilities, used as messenger birds. Very adaptable to cities.',
        sound: 'Cooing, gurgling',
        breeding: 'Year-round, 1-2 eggs multiple times'
      },
      {
        id: 26,
        name: 'Vulture',
        scientificName: 'Gyps fulvus',
        image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400',
        habitat: 'Mountains, open areas, savannas',
        diet: 'Carrion (dead animals)',
        size: '95-110 cm',
        weight: '6-11 kg',
        lifespan: '20-30 years',
        status: 'Near Threatened',
        facts: 'Important scavengers, help prevent disease spread. Excellent soaring abilities.',
        sound: 'Hissing, grunting',
        breeding: 'Winter-spring, 1 egg in cliff nests'
      },
      {
        id: 27,
        name: 'Seagull',
        scientificName: 'Larus argentatus',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
        habitat: 'Coasts, harbors, urban areas',
        diet: 'Fish, insects, scraps, eggs',
        size: '55-67 cm',
        weight: '750g-1.75kg',
        lifespan: '10-15 years',
        status: 'Least Concern',
        facts: 'Highly adaptable and intelligent. Can drink both fresh and salt water.',
        sound: 'Squawking, mewing calls',
        breeding: 'Spring-summer, 2-3 eggs in ground nests'
      },
      {
        id: 28,
        name: 'Finch',
        scientificName: 'Fringillidae',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        habitat: 'Gardens, woodlands, grasslands',
        diet: 'Seeds, insects, fruits',
        size: '10-20 cm',
        weight: '8-40g',
        lifespan: '4-7 years',
        status: 'Various',
        facts: 'Small colorful songbirds, important for seed dispersal. Social birds.',
        sound: 'Twittering, chirping songs',
        breeding: 'Spring-summer, 3-6 eggs'
      },
      {
        id: 29,
        name: 'Crane',
        scientificName: 'Grus grus',
        image: 'https://images.unsplash.com/photo-1568641280656-1b5d3e4c6b93?w=400',
        habitat: 'Wetlands, grasslands, agricultural fields',
        diet: 'Plants, insects, small animals',
        size: '100-130 cm',
        weight: '3-6 kg',
        lifespan: '20-30 years',
        status: 'Least Concern',
        facts: 'Elegant birds known for elaborate courtship dances. Symbol of longevity.',
        sound: 'Trumpeting calls, can be heard from miles',
        breeding: 'Spring, 2 eggs in marsh nests'
      },
      {
        id: 30,
        name: 'Cockatoo',
        scientificName: 'Cacatuidae',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
        habitat: 'Forests, woodlands, urban areas',
        diet: 'Seeds, nuts, fruits, insects',
        size: '30-60 cm',
        weight: '300g-1.2kg',
        lifespan: '60-100 years',
        status: 'Various',
        facts: 'Intelligent parrots with distinctive crests. Can live longer than humans.',
        sound: 'Loud screeches, can mimic sounds',
        breeding: 'Spring, 2-8 eggs in tree hollows'
      }
    ];
  }

  async getBirdById(id) {
    const birds = await this.getBirds();
    return birds.find(bird => bird.id === id);
  }
}

export const apiService = new ApiService();
export default apiService;