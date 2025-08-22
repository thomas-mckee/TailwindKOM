export const inspirationalQuotes = [
  {
    text: "I could not ignore their withering glances. They looked at me the way real vampires look at Count Chocula.",
    author: "Norm Macdonald, Based on a True Story"
  },
  {
    text: "The only thing an old man can tell a young man is that it goes fast, real fast, and if you’re not careful it’s too late. Of course, the young man will never understand this truth.",
    author: "Norm Macdonald, Based on a True Story"
  },
  {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein"
  },
  {
    text: "It is the unknown around the corner that turns my wheels.",
    author: "Heinz Stücke"
  },
  {
    text: "Nothing compares to the simple pleasure of riding a bike.",
    author: "John F. Kennedy"
  },
  {
    text: "Ride as much or as little, as long or as short as you feel. But ride.",
    author: "Eddy Merckx"
  },
  {
    text: "A bicycle ride around the world begins with a single pedal stroke.",
    author: "Scott Stoll"
  },
  {
    text: "The bicycle is a curious vehicle. Its passenger is its engine.",
    author: "John Howard"
  },
  {
    text: "My biggest fear is that when I die, my spouse will sell my bicycles for what I told her they cost.",
    author: "Unknown"
  },
  {
    text: "It never gets easier, you just get faster.",
    author: "Greg LeMond"
  },
  {
    text: "Don't buy upgrades; ride up grades.",
    author: "Eddy Merckx"
  },
  {
    text: "To go wrong in one's own way is better than to go right in someone else's.",
    author: "Fyodor Dostoevsky, Crime and Punishment"
  },
  {
    text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
    author: "Fyodor Dostoyevsky, The Brothers Karamazov"
  },
  {
    text: "Beauty will save the world.",
    author: "Fyodor Dostoevsky, The Idiot"
  },
  {
    text: "Cowardice is the most terrible of vices.",
    author: "Mikhail Bulgakov, The Master and Margarita"
  },
  {
    text: "Everything will turn out right, the world is built on that.",
    author: "Mikhail Bulgakov, The Master and Margarita"
  },
  {
    text: "Everyone thinks of changing the world, but no one thinks of changing himself.",
    author: "Leo Tolstoy"
  },
  {
    text: "Spring is the time of plans and projects.",
    author: "Leo Tolstoy, Anna Karenina"
  },
  {
    text: "There is no dark side of the Moon. It's all dark, really.",
    author: "Pink Floyd, Pink Floyd: Dark Side of the Moon"
  },
  {
    text: "Ooh, you can dance, you can jive, having the time of your life",
    author: "ABBA, Dancing Queen"
  }
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[randomIndex];
};