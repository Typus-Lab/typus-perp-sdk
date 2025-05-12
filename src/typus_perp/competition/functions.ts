import { PUBLISHED_AT } from "..";
import { String } from "../../_dependencies/source/0x1/ascii/structs";
import { obj, pure } from "../../_framework/util";
import { Transaction, TransactionArgument, TransactionObjectInput } from "@mysten/sui/transactions";

export interface AddScoreArgs {
    version: TransactionObjectInput;
    ecosystemVersion: TransactionObjectInput;
    typusLeaderboardRegistry: TransactionObjectInput;
    tailsStakingRegistry: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    volumeUsd: bigint | TransactionArgument;
    user: string | TransactionArgument;
    clock: TransactionObjectInput;
}

export function addScore(tx: Transaction, args: AddScoreArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::competition::add_score`,
        arguments: [
            obj(tx, args.version),
            obj(tx, args.ecosystemVersion),
            obj(tx, args.typusLeaderboardRegistry),
            obj(tx, args.tailsStakingRegistry),
            obj(tx, args.competitionConfig),
            pure(tx, args.volumeUsd, `u64`),
            pure(tx, args.user, `address`),
            obj(tx, args.clock),
        ],
    });
}

export interface NewCompetitionConfigArgs {
    version: TransactionObjectInput;
    boostBp: Array<bigint | TransactionArgument> | TransactionArgument;
    programName: string | TransactionArgument;
}

export function newCompetitionConfig(tx: Transaction, args: NewCompetitionConfigArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::competition::new_competition_config`,
        arguments: [obj(tx, args.version), pure(tx, args.boostBp, `vector<u64>`), pure(tx, args.programName, `${String.$typeName}`)],
    });
}

export interface SetBoostBpArgs {
    version: TransactionObjectInput;
    competitionConfig: TransactionObjectInput;
    boostBp: Array<bigint | TransactionArgument> | TransactionArgument;
}

export function setBoostBp(tx: Transaction, args: SetBoostBpArgs, published_at: string = PUBLISHED_AT) {
    return tx.moveCall({
        target: `${published_at}::competition::set_boost_bp`,
        arguments: [obj(tx, args.version), obj(tx, args.competitionConfig), pure(tx, args.boostBp, `vector<u64>`)],
    });
}
