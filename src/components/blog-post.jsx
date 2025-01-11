const BlogPost = ({ title, content }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">{title}</h2>
        <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
);

export default BlogPost;