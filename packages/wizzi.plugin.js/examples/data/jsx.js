/*
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
*/

/**/
<style jsx global>{`
    body {
        margin: 10px;
        padding: 10px;
    }
`}</style>
/**/

{ /* you can include <Component />s here that include
        other <p>s that don't get unexpected styles! */ }

/*

<Link href="/about">
  <a style={{ fontSize: 20 }}>About Page</a>
</Link>

const PostLink = (props) => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

(function () {

    var HelloWorld = React.createClass({

        render: function () {
            return (
                <div className="greeting" data={x} {...other}>
                    Hello World
                </div>
            );
        }
    });

    var element = React.createElement(HelloWorld, {});

    ReactDOM.render(element, document.getElementById("app"));

})();

const TodoList = ({ todos }) => (
    <div>
        {...todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </div>
)

*/

