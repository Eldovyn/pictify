import click
from dotenv import load_dotenv
from ape import accounts, project, networks

load_dotenv()

@click.command()
@click.argument("account_name", required=False)
@click.option("--network", default="ethereum:sepolia:node", help="Network specifier")
@click.option("--publish/--no-publish", default=False, help="Verify contract on Etherscan after deploy")
def cli(account_name, network, publish):
    with networks.parse_network_choice(network) as provider:
        print(f"Active Network: {provider.network.name}")

        try:
            akun = accounts.load(account_name)
        except KeyError:
            print(f"Error: Account '{account_name}' is not found in Ape.")
            return

        print(f"Deploying TodoList contract using account: {akun.address}")

        todo_list = akun.deploy(project.TodoList, publish=publish)

        print(f"TodoList successfully deployed to: {todo_list.address}")
        if publish:
            print(f"Contract verified on Etherscan!")