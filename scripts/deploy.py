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
        
        if provider.network.name in ("local", "development"):
            if not account_name:
                deployer = accounts.test_accounts[0]
            else:
                try:
                    deployer = accounts.load(account_name)
                except KeyError:
                    deployer = accounts.test_accounts[0]
        else:
            if not account_name:
                print("Error: Harap masukkan nama akun untuk jaringan non-lokal (seperti Sepolia).")
                return
            try:
                deployer = accounts.load(account_name)
            except KeyError:
                print(f"Error: Account '{account_name}' is not found in Ape.")
                return

        print(f"Deploying contracts using account: {deployer.address}")

        my_nft = deployer.deploy(project.MyNFT, deployer.address, publish=publish)
        print(f"MyNFT successfully deployed to: {my_nft.address}")

        todo_list = deployer.deploy(project.TodoList, publish=publish)
        print(f"TodoList successfully deployed to: {todo_list.address}")

        if publish:
            print(f"Contracts verified on Etherscan!")
