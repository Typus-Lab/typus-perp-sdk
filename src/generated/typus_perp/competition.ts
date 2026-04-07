/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** The `competition` module defines the logic for trading competitions. */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index.js";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
const $moduleName = "@typus/perp::competition";
export const CompetitionConfig = new MoveStruct({
    name: `${$moduleName}::CompetitionConfig`,
    fields: {
        id: bcs.Address,
        /** The boost in basis points for each staking level. */
        boost_bp: bcs.vector(bcs.u64()),
        /** Whether the competition is active. */
        is_active: bcs.bool(),
        /** The name of the program. */
        program_name: bcs.string(),
        /** Padding for future use. */
        u64_padding: bcs.vector(bcs.u64()),
    },
});
export interface NewCompetitionConfigArguments {
    version: RawTransactionArgument<string>;
    boostBp: RawTransactionArgument<number | bigint[]>;
    programName: RawTransactionArgument<string>;
}
export interface NewCompetitionConfigOptions {
    package?: string;
    arguments:
        | NewCompetitionConfigArguments
        | [
              version: RawTransactionArgument<string>,
              boostBp: RawTransactionArgument<number | bigint[]>,
              programName: RawTransactionArgument<string>,
          ];
}
export function newCompetitionConfig(options: NewCompetitionConfigOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [null, "vector<u64>", "0x1::string::String"] satisfies (string | null)[];
    const parameterNames = ["version", "boostBp", "programName"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "competition",
            function: "new_competition_config",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface SetBoostBpArguments {
    version: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    boostBp: RawTransactionArgument<number | bigint[]>;
}
export interface SetBoostBpOptions {
    package?: string;
    arguments:
        | SetBoostBpArguments
        | [
              version: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              boostBp: RawTransactionArgument<number | bigint[]>,
          ];
}
export function setBoostBp(options: SetBoostBpOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [null, null, "vector<u64>"] satisfies (string | null)[];
    const parameterNames = ["version", "competitionConfig", "boostBp"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "competition",
            function: "set_boost_bp",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
export interface AddScoreArguments {
    version: RawTransactionArgument<string>;
    ecosystemVersion: RawTransactionArgument<string>;
    typusLeaderboardRegistry: RawTransactionArgument<string>;
    tailsStakingRegistry: RawTransactionArgument<string>;
    competitionConfig: RawTransactionArgument<string>;
    volumeUsd: RawTransactionArgument<number | bigint>;
    user: RawTransactionArgument<string>;
}
export interface AddScoreOptions {
    package?: string;
    arguments:
        | AddScoreArguments
        | [
              version: RawTransactionArgument<string>,
              ecosystemVersion: RawTransactionArgument<string>,
              typusLeaderboardRegistry: RawTransactionArgument<string>,
              tailsStakingRegistry: RawTransactionArgument<string>,
              competitionConfig: RawTransactionArgument<string>,
              volumeUsd: RawTransactionArgument<number | bigint>,
              user: RawTransactionArgument<string>,
          ];
}
/** Adds a score to the competition leaderboard. WARNING: no authority check inside */
export function addScore(options: AddScoreOptions) {
    const packageAddress = options.package ?? "@typus/perp";
    const argumentsTypes = [null, null, null, null, null, "u64", "address", "0x2::clock::Clock"] satisfies (string | null)[];
    const parameterNames = [
        "version",
        "ecosystemVersion",
        "typusLeaderboardRegistry",
        "tailsStakingRegistry",
        "competitionConfig",
        "volumeUsd",
        "user",
    ];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "competition",
            function: "add_score",
            arguments: normalizeMoveArguments(options.arguments, argumentsTypes, parameterNames),
        });
}
