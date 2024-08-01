const AboutContent = () => (
  <div className="text-md flex flex-col gap-6 text-zinc-600 dark:text-zinc-400">
    <p>
      Welcome to {"Frederic-K's"} Blog v.1 ! This blog is a demo and was created
      by Frédéric KREUDER as a personal project to practice Full Stack MERN
      development.
    </p>
    <p>
      This demo is a simple blog that allows the owner to create, update and
      delete posts. It also includes a dashboard where he can manage posts,
      users and comments.
    </p>
    <p>
      You can consult post which include carousel and lightbox, browse comments
      and use advanced search to find articles that interest you.
    </p>
    <p>
      You can also create a account with your email and password, or sign in
      with Google to leave comments, like posts and comments or get in touch via
      the contact form.
    </p>
    <p>
      It was inspired by online courses and self-educated. Reworked, refactored,
      restyled and enhanced with email validation, forgot my password function,
      contact form, database cleaning, etc...
    </p>
    <p>
      The blog is built using the MERN stack, which includes MongoDB, Express,
      React, Node.js. The front-end is built using React and Tailwind CSS, while
      the back-end is built using Node.js, Express and connected to MongoDB.
    </p>
  </div>
)

export default AboutContent
