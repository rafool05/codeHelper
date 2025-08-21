const socials = [
  { label: "LinkedIn", url: "https://linkedin.com/in/rafool05", svg: "https://cdn-icons-png.flaticon.com/512/174/174857.png" },
  { label: "GitHub", url: "https://github.com/rafool05", svg: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
  { label: "LeetCode", url: "https://leetcode.com/u/r_afool/", svg: "https://leetcode.com/static/images/LeetCode_logo_rvs.png" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-primary-900 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-gray-200">
          Contact: <a className="text-yellow-400 underline" href="mailto:rudraksh05jain@gmail.com">rudraksh05jain@gmail.com</a>
        </div>
        <div className="flex gap-6">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition transform hover:scale-110 hover:brightness-125"
            >
              <img src={s.svg} alt={`${s.label} icon`} className="h-8 w-8 object-contain" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
