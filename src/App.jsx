import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
	const StyledApp = styled.main`
		padding: 20px;
	`;

	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						<Heading as="h1">Hello World</Heading>
						<div>
							<Heading as="h2">Check in and out</Heading>
							<Button variation='primary' size='medium' onClick={() => alert("Check In")}>Check in</Button>
							<Button variation='secondary' size='small' onClick={() => alert("Check Out")}>Check out</Button>
						</div>
					</Row>

					<Row>
						<Heading as="h3">Form</Heading>
						<form>
							<Input
								type="number"
								placeholder="Number of quests"
							></Input>
							<Input
								type="number"
								placeholder="Number of quests"
							></Input>
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
