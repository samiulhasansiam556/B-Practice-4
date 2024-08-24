
import NavIn from '../../components/nav/NavIn';
import ReadTodos from '../CRUD/ReadTodos';

function HomeIn() {
    return (
    <div className="min-h-screen bg-gray-100">
        <NavIn />
        <main className="container mx-auto px-4 py-8">
            <ReadTodos/>
        </main>
    </div>
    );
}

export default HomeIn;
