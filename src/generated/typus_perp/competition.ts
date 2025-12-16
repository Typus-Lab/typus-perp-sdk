/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/

/** The `competition` module defines the logic for trading competitions. */

import { MoveStruct, normalizeMoveArguments, type RawTransactionArgument } from "../utils/index";
import { bcs } from "@mysten/sui/bcs";
import { type Transaction } from "@mysten/sui/transactions";
import * as object from "./deps/sui/object";
const $moduleName = "@typus/perp::competition";
export const CompetitionConfig = new MoveStruct({
    name: `${$moduleName}::CompetitionConfig`,
    fields: {
        id: object.UID,
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
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "vector<u64>",
        "0x0000000000000000000000000000000000000000000000000000000000000001::ascii::String",
    ] satisfies string[];
    const parameterNames = ["version", "boostBp", "programName"];
    return (tx: Transaction) =>
        tx.moveCall({
            package: packageAddress,
            module: "competition",
            function: "new_competition_config",
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
    const argumentsTypes = [
        `${packageAddress}::admin::Version`,
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::ecosystem::Version",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::leaderboard::TypusLeaderboardRegistry",
        "0x4213e12a2220f15f1837a76897110d2260786558169bd8d0847f21e9b551f277::tails_staking::TailsStakingRegistry",
        `${packageAddress}::competition::CompetitionConfig`,
        "u64",
        "address",
        "0x0000000000000000000000000000000000000000000000000000000000000002::clock::Clock",
    ] satisfies string[];
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
