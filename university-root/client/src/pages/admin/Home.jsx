
function Home() {
  const name = localStorage.getItem('name');
  if(localStorage.getItem("reloadCount") === "0"){
    localStorage.setItem("reloadCount",1);
    window.location.reload();
  }
  return (
    <div>Welcome back {name}</div>
  )
}

export default Home