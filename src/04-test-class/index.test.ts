// Uncomment the code below and write your tests
// import { initial } from 'lodash';

import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

type BankTransferDetails = {
  account: BankAccount;
  toAccount: BankAccount;
  initialBalance: number;
  insufficientAmount: number;
  amount: number;
};

const initialBalance = 100000;

describe('BankAccount', () => {
  let transferDetails: BankTransferDetails;
  beforeEach(() => {
    transferDetails = {
      account: getBankAccount(initialBalance),
      toAccount: getBankAccount(initialBalance),
      initialBalance,
      insufficientAmount: initialBalance + 0.001,
      amount: 5000,
    };
  });
  test('should create account with initial balance', () => {
    const { account } = transferDetails;
    const newAccount = getBankAccount(initialBalance);

    expect(newAccount).toStrictEqual(account);
    expect(account.getBalance()).toStrictEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const { account, insufficientAmount } = transferDetails;
    expect(() => account.withdraw(insufficientAmount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const { account, toAccount, insufficientAmount } = transferDetails;
    expect(() => account.transfer(insufficientAmount, toAccount)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const { account, initialBalance } = transferDetails;
    expect(() => account.transfer(initialBalance, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const { account, amount } = transferDetails;
    const expectedBalance: number = initialBalance + amount;
    account.deposit(amount);
    expect(account.getBalance()).toStrictEqual(expectedBalance);
  });

  test('should withdraw money', () => {
    const { account, amount } = transferDetails;
    account.withdraw(amount);
    expect(account.getBalance()).toBeGreaterThanOrEqual(0);
  });

  test('should transfer money', () => {
    const { account, toAccount, amount } = transferDetails;
    const previousAccountBalance: number = toAccount.getBalance();
    account.transfer(amount, toAccount);
    expect(account.getBalance()).toBeLessThan(initialBalance);
    expect(toAccount.getBalance()).toStrictEqual(
      previousAccountBalance + amount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async (): Promise<void> => {
    const { account } = transferDetails;
    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(1000);

    const fetchedBalance: number | null = await account.fetchBalance();
    expect(fetchedBalance).not.toBeNull();
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(1000);

    fetchBalanceMock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async (): Promise<void> => {
    const { account } = transferDetails;
    const mockBalance = 50000;

    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(mockBalance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(mockBalance);
    fetchBalanceMock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async (): Promise<void> => {
    const { account } = transferDetails;

    const fetchBalanceMock = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );

    fetchBalanceMock.mockRestore();
  });
});
