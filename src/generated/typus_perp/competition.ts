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
        "0x4b0f4ee1a40ce37ec81c987cc4e76a665419e74b863319492fc7d26f708b835a::ecosystem::Version",
        "0x4b0f4ee1a40ce37ec81c987cc4e76a665419e74b863319492fc7d26f708b835a::leaderboard::TypusLeaderboardRegistry",
        "0x4b0f4ee1a40ce37ec81c987cc4e76a665419e74b863319492fc7d26f708b835a::tails_staking::TailsStakingRegistry",
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
