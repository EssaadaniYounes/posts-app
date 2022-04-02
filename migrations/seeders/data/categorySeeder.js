import Category from "../../schema/Category.js";

const categories = [
    'Web development',
    'Mobile development',
    'Data science',
    'Machine learning',
    'Artificial intelligence',
    'DevOps',
    'Blockchain',
    'Game development',
    'Cryptocurrency',
    'Micro-services',
];
export const deleteCategories = async () => {
    console.warn("We are trying to delete all categories please wait... 🤏");
    const categories = await Category.deleteMany()
        .then(() => console.info("All Categories have been deleted successfully 🎅"))
        .catch((err) => console.error(`🛑 a error occurred while deleting ${err}`));
}
export const generateCategories = async () => {
    console.info(" ⏳⌛ Generating categories...");
    for (let i = 0; i < categories.length; i++) {
        const category = await new Category({
            label: categories[i]
        });
        await category.save();
    }
    console.info("✅✅✅ Categories generated successfully");
}
